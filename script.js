document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.getElementById("startButton");

    // Cek tombol
    if (!startButton) {
        console.error("Tombol startButton tidak ditemukan!");
        return;
    }


    // =========================
    // TOMBOL MULAI
    // =========================

    startButton.addEventListener("click", function () {

        const yourName =
            document.getElementById("yourName").value.trim();

        const partnerName =
            document.getElementById("partnerName").value.trim();

        const relationshipDate =
            document.getElementById("relationshipDate").value;


        // Validasi
        if (yourName === "") {
            alert("Masukkan nama kamu terlebih dahulu ❤️");
            return;
        }

        if (partnerName === "") {
            alert("Masukkan nama pasangan terlebih dahulu ❤️");
            return;
        }

        if (relationshipDate === "") {
            alert("Pilih tanggal jadian terlebih dahulu ❤️");
            return;
        }


        // Cek tanggal
        const selectedDate =
            new Date(relationshipDate + "T00:00:00");

        const today = new Date();


        if (isNaN(selectedDate.getTime())) {
            alert("Tanggal tidak valid.");
            return;
        }


        if (selectedDate > today) {
            alert("Tanggal jadian tidak boleh di masa depan.");
            return;
        }


        // Simpan data
        localStorage.setItem(
            "panowzYourName",
            yourName
        );

        localStorage.setItem(
            "panowzPartnerName",
            partnerName
        );

        localStorage.setItem(
            "panowzDate",
            relationshipDate
        );


        // Tampilkan website
        showWebsite();

    });


    // =========================
    // TAMPILKAN WEBSITE
    // =========================

    function showWebsite() {

        const yourName =
            localStorage.getItem("panowzYourName");

        const partnerName =
            localStorage.getItem("panowzPartnerName");

        const date =
            localStorage.getItem("panowzDate");


        if (!yourName || !partnerName || !date) {
            return;
        }


        const displayYour =
            document.getElementById("displayYour");

        const displayPartner =
            document.getElementById("displayPartner");

        const displayDate =
            document.getElementById("displayDate");


        if (displayYour) {
            displayYour.textContent = yourName;
        }

        if (displayPartner) {
            displayPartner.textContent = partnerName;
        }


        const dateObject =
            new Date(date + "T00:00:00");


        if (displayDate) {

            displayDate.textContent =
                dateObject.toLocaleDateString(
                    "id-ID",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );

        }


        const formPage =
            document.getElementById("formPage");

        const mainPage =
            document.getElementById("mainPage");


        if (formPage) {
            formPage.classList.add("hidden");
        }

        if (mainPage) {
            mainPage.classList.remove("hidden");
        }


        updateAll();

    }


    // =========================
    // UPDATE DURASI
    // =========================

    function updateAll() {

        const date =
            localStorage.getItem("panowzDate");


        if (!date) {
            return;
        }


        const start =
            new Date(date + "T00:00:00");

        const now =
            new Date();


        // =========================
        // DURASI HUBUNGAN
        // =========================

        let years =
            now.getFullYear() -
            start.getFullYear();

        let months =
            now.getMonth() -
            start.getMonth();

        let days =
            now.getDate() -
            start.getDate();


        if (days < 0) {

            months--;

            const previousMonth =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0
                );

            days += previousMonth.getDate();

        }


        if (months < 0) {

            years--;
            months += 12;

        }


        const duration =
            document.getElementById("duration");


        if (duration) {

            duration.textContent =
                years +
                " tahun, " +
                months +
                " bulan, " +
                days +
                " hari ❤️";

        }


        // =========================
        // COUNTDOWN
        // =========================

        let nextAnniversary =
            new Date(
                now.getFullYear(),
                start.getMonth(),
                start.getDate(),
                0,
                0,
                0
            );


        if (nextAnniversary <= now) {

            nextAnniversary.setFullYear(
                now.getFullYear() + 1
            );

        }


        const difference =
            nextAnniversary.getTime() -
            now.getTime();


        const totalSeconds =
            Math.max(
                0,
                Math.floor(difference / 1000)
            );


        const daysLeft =
            Math.floor(
                totalSeconds / 86400
            );


        const hoursLeft =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutesLeft =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const secondsLeft =
            totalSeconds % 60;


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (daysElement) {
            daysElement.textContent = daysLeft;
        }

        if (hoursElement) {
            hoursElement.textContent = hoursLeft;
        }

        if (minutesElement) {
            minutesElement.textContent = minutesLeft;
        }

        if (secondsElement) {
            secondsElement.textContent = secondsLeft;
        }

    }


    // =========================
    // EDIT DATA
    // =========================

    window.editData = function () {

        const formPage =
            document.getElementById("formPage");

        const mainPage =
            document.getElementById("mainPage");


        if (formPage) {
            formPage.classList.remove("hidden");
        }

        if (mainPage) {
            mainPage.classList.add("hidden");
        }


        document.getElementById("yourName").value =
            localStorage.getItem(
                "panowzYourName"
            ) || "";


        document.getElementById("partnerName").value =
            localStorage.getItem(
                "panowzPartnerName"
            ) || "";


        document.getElementById("relationshipDate").value =
            localStorage.getItem(
                "panowzDate"
            ) || "";

    };


    // =========================
    // RESET DATA
    // =========================

    window.resetData = function () {

        const confirmReset =
            confirm(
                "Hapus semua data hubungan?"
            );


        if (!confirmReset) {
            return;
        }


        localStorage.removeItem(
            "panowzYourName"
        );

        localStorage.removeItem(
            "panowzPartnerName"
        );

        localStorage.removeItem(
            "panowzDate"
        );


        location.reload();

    };


    // =========================
    // LOAD DATA OTOMATIS
    // =========================

    const savedName =
        localStorage.getItem(
            "panowzYourName"
        );

    const savedPartner =
        localStorage.getItem(
            "panowzPartnerName"
        );

    const savedDate =
        localStorage.getItem(
            "panowzDate"
        );


    if (
        savedName &&
        savedPartner &&
        savedDate
    ) {

        showWebsite();

    }


    // =========================
    // UPDATE SETIAP DETIK
    // =========================

    setInterval(
        updateAll,
        1000
    );

});