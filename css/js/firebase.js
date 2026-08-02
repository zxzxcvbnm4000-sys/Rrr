/* =========================================
   Free Neet
   firebase.js
   الإصدار الأول
========================================= */

// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// بيانات مشروع Firebase

const firebaseConfig = {

    apiKey: "AIzaSyDxIytATt7febsVDYkmgmuKHzGBqScDwng",

    authDomain: "free-neet.firebaseapp.com",

    projectId: "free-neet",

    storageBucket: "free-neet.firebasestorage.app",

    messagingSenderId: "354882625535",

    appId: "1:354882625535:web:94aa8af149a07b394711ca",

    measurementId: "G-4VHYNMPX6J"

};


// تشغيل Firebase

const app = initializeApp(firebaseConfig);

// قاعدة البيانات

const db = getFirestore(app);


// =========================================
// حفظ الطلب
// =========================================

export async function saveOrder(orderData) {

    try {

        await addDoc(

            collection(db, "orders"),

            {

                ...orderData,

                createdAt: serverTimestamp(),

                status: "جديد"

            }

        );

        console.log("تم حفظ الطلب");

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}


// =========================================
// تصدير قاعدة البيانات
// =========================================

export { db };
