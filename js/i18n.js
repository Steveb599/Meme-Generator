'use strict';

const gTrans = {
    'header-gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'header-saved': {
        en: 'Saved Memes',
        he: 'ממים שמורים',
    },
    'header-about': {
        en: 'About',
        he: 'אודות',
    },
    'input-text': {
        en: 'Add Meme Text',
        he: 'הוסף טקסט',
    },
    'share-button': {
        en: ' Share',
        he: 'שתף ',
    },
    'download-button': {
        en: 'Download',
        he: ' הורד',
    },
    'save-button': {
        en: ' Save',
        he: ' שמור',
    },
    'image-search': {
        en: 'Search for Image',
        he: 'חפש תמונה',
    },
    'funny-keyword': {
        en: 'Funny',
        he: 'מצחיק',
    },
    'animal-keyword': {
        en: 'Animal',
        he: 'חיה',
    },
    'men-keyword': {
        en: 'Men',
        he: 'גבר',
    },
    'women-keyword': {
        en: 'Women',
        he: 'אישה',
    },
    'comic-keyword': {
        en: 'Comic',
        he: 'קומיקס',
    },
    'smile-keyword': {
        en: 'Smile',
        he: 'חיוך',
    },
    'more-button': {
        en: 'More',
        he: 'עוד',
    },
    'about-head': {
        en: "Welcome to Steve's Meme Generator Project!",
        he: 'ברוכים הבאים למחולל הממים של סטיב',
    },
    'about-first-section': {
        en: 'This project is a fun and interactive web application that allows users to create custom memes with their own captions and share them with the world.',
        he: 'פרויקט זה הוא פרויקט ווב אינטראקטיבי עם התאמה למובייל שמאפשר למשתמשים לייצר ממים עם הכתוביות שלהם ולשתף את המם שהם יצרו עם העולם',
    },
    'about-second-section': {
        en: 'As a student at Coding Academy, I developed this project using web technologies such as HTML, CSS, and JavaScript.The project utilizes a canvas element to render the memes and provides users with various options to ustomize their memes.Users can choose from a collection of images, change the font size and color, add multiple captions, and download the memes to share them with their friends and family.',
        he: '  כתלמיד בבוטקאמפ קודינג אקדמי, אני פיתחתי את הפרוייקט הזה בעזרת טכנולוגיות ווב. הפרוייקט משתמש באלמנט קנבס לעיבוד ממים ולרנדר אותם על גבי המסך ומספק למשתמש אפשרויות שונות לשינוי הממים והתאמה אישית. המשתמש יכול לבחור ממגוון רחב של תמונות לבחירתו, לשנות את גודל הכתב, הצבע, להוסיף כתוביות ולהוריד ולשתף את המם שהוא יצר עם החברים והמשפחה.',
    },
    'about-third-section': {
        en: "So what are you waiting for? let's start making memes as well as having a good laugh😉",
        he: 'אז למה אתם מחכים? בואו נתחיל לייצר ממים ולצחוק! 😉',
    },
    'flexible-button': {
        en: "I'm flexible",
        he: 'מם רנדומלי',
    },
    'upload-image': {
        en: 'Upload an Image',
        he: 'לחץ על מנת להעלות תמונה'
    },
    'saved-memes-message': {
        en: 'Oops..there are no saved memes yet',
        he: 'אופס...עוד אין ממים שמורים'
    }
}

let gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    var transTxt = transMap[gCurrLang]
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    });
}

document.getElementById("language-toggle").addEventListener("click", function () {
    let lang = document.getElementById("language-toggle").checked ? "he" : "en"
    onSetLang(lang)
})

function onSetLang(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    gCurrLang = lang
    changeLanguage(lang)
    doTrans()
}