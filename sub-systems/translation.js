const axios = require('axios');
const { DEEPL_API_KEY } = require('../config.json');

async function translateText(text, targetLang) {
    try {
        const response = await axios.post(
            'https://api-free.deepl.com/v2/translate',
            new URLSearchParams({
                auth_key: DEEPL_API_KEY,
                text: text,
                target_lang: targetLang
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.data.translations[0].text;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error('翻訳中にエラーが発生しました。');
    }
}

function isJapanese(text) {
    return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(text);
}

async function handle(message) {
    if (message.content.startsWith('!tl')) {
        const textToTranslate = message.content.slice(3).trim();

        if (textToTranslate.length === 0) {
            return message.channel.send('翻訳する文章を入力してください。例: `!tl こんにちは`');
        }

        try {
            const targetLang = isJapanese(textToTranslate) ? 'EN' : 'JA';
            const translatedText = await translateText(textToTranslate, targetLang);
            const sourceLang = targetLang === 'EN' ? '日本語' : '英語';
            const targetLangName = targetLang === 'EN' ? '英語' : '日本語';

            message.channel.send(`${sourceLang}から${targetLangName}への翻訳結果:\n${translatedText}`);
        } catch (error) {
            message.channel.send(error.message);
        }
    }
}

module.exports = { handle };