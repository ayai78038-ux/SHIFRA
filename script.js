
/* SHIFRA | شِفرة - JavaScript Stage */

document.addEventListener("DOMContentLoaded", function () {

    // عناصر مساعدة
    function createMessage(parent, message, color) {
        let box = document.createElement("p");
        box.textContent = message;
        box.style.padding = "12px";
        box.style.marginTop = "15px";
        box.style.borderRadius = "12px";
        box.style.background = "rgba(155,123,255,.12)";
        box.style.border = "1px solid rgba(167,157,255,.3)";
        box.style.color = color || "#ffffff";
        parent.appendChild(box);
        return box;
    }

    // =====================================
    // 1. صفحة اكتشف نفسك
    // =====================================

    let discoverForm = document.querySelector(
        'form input[name="interest"]'
    );

    if (discoverForm) {
        let form = discoverForm.closest("form");

        form.addEventListener("submit", function (event) {

            let interest = form.querySelector(
                'input[name="interest"]:checked'
            );

            let task = form.querySelector(
                'input[name="task"]:checked'
            );

            let field = form.querySelector(
                'input[name="field"]:checked'
            );

            if (!interest || !task || !field) {
                event.preventDefault();
                alert("يرجى الإجابة عن جميع الأسئلة أولاً.");
                return;
            }
        });
    }

    // =====================================
    // 2. صفحة أسلوب تعلمك
    // =====================================

    let learningForm = document.querySelector(
        'form input[name="learning_style"]'
    );

    if (learningForm) {
        let form = learningForm.closest("form");

        form.addEventListener("submit", function (event) {

            let styles = form.querySelectorAll(
                'input[name="learning_style"]:checked'
            );

            let place = form.querySelector(
                'input[name="study_place"]:checked'
            );

            if (styles.length === 0) {
                event.preventDefault();
                alert("اختاري طريقة تعلم واحدة على الأقل.");
                return;
            }

            if (!place) {
                event.preventDefault();
                alert("يرجى تحديد المكان الذي تفضلين الدراسة فيه.");
                return;
            }
        });
    }

    // =====================================
    // 3. صفحة النتائج
    // =====================================

    let resultsSection = document.querySelector(
        "body:not(.page-home) main > section"
    );

    if (resultsSection && document.title.includes("نتائج")) {

        let params = new URLSearchParams(window.location.search);

        let interest = params.get("interest");
        let task = params.get("task");
        let field = params.get("field");
        let learningStyles = params.getAll("learning_style");
        let studyPlace = params.get("study_place");

        let hasDiscoverResults = interest || task || field;
        let hasLearningResults = learningStyles.length > 0 || studyPlace;

        if (hasDiscoverResults || hasLearningResults) {

            let resultBox = document.createElement("div");
            resultBox.style.marginTop = "25px";
            resultBox.style.padding = "22px";
            resultBox.style.border = "1px solid rgba(167,157,255,.35)";
            resultBox.style.borderRadius = "20px";
            resultBox.style.background = "rgba(155,123,255,.09)";

            let heading = document.createElement("h2");
            heading.textContent = "نتائج رحلتك في شِفرة";
            resultBox.appendChild(heading);

            function addResult(title, value) {
                if (!value) return;

                let paragraph = document.createElement("p");
                paragraph.textContent = title + ": " + value;
                resultBox.appendChild(paragraph);
            }

            if (hasDiscoverResults) {

                addResult("النشاط الذي تفضله", interest);
                addResult("المهمة التي تفضلها", task);
                addResult("المجال الذي ترغب في استكشافه", field);

                let recommendation = "";

                if (
                    interest === "حل المشكلات" ||
                    field === "التقنية" ||
                    task === "تحليل البيانات"
                ) {
                    recommendation =
                        "يمكنك استكشاف البرمجة، وتحليل البيانات، وحل المشكلات الرقمية.";
                } else if (
                    interest === "الإبداع" ||
                    field === "التصميم" ||
                    task === "ابتكار تصميم"
                ) {
                    recommendation =
                        "يمكنك استكشاف التصميم الرقمي، وتصميم واجهات المواقع، وصناعة المحتوى.";
                } else if (
                    interest === "التواصل" ||
                    field === "التعليم" ||
                    task === "العمل الجماعي"
                ) {
                    recommendation =
                        "يمكنك استكشاف التعليم، والتدريب، والتواصل والعمل ضمن الفرق.";
                } else {
                    recommendation =
                        "يمكنك استكشاف الإدارة، وتنظيم المشروعات، وريادة الأعمال.";
                }

                let recommendationTitle = document.createElement("h3");
                recommendationTitle.textContent = "اقتراحات تناسب اختياراتك";
                resultBox.appendChild(recommendationTitle);

                let recommendationText = document.createElement("p");
                recommendationText.textContent = recommendation;
                resultBox.appendChild(recommendationText);
            }

            if (hasLearningResults) {

                let learningTitle = document.createElement("h3");
                learningTitle.textContent = "تفضيلات التعلم";
                resultBox.appendChild(learningTitle);

                addResult(
                    "طرق التعلم التي اخترتها",
                    learningStyles.join("، ")
                );

                addResult("مكان الدراسة المفضل", studyPlace);

                let learningAdvice = document.createElement("p");
                learningAdvice.textContent =
                    "جرّب الجمع بين الطرق التي اخترتها، ولاحظ أيها يساعدك أكثر حسب الموضوع.";
                resultBox.appendChild(learningAdvice);
            }

            let note = document.createElement("p");
            note.textContent =
                "هذه النتائج إرشادات استكشافية مبنية على اختياراتك، وليست تشخيصاً أو حكماً نهائياً على قدراتك.";
            resultBox.appendChild(note);

            resultsSection.appendChild(resultBox);

        } else {
            createMessage(
                resultsSection,
                "لم تصلنا إجابات بعد. ابدأ من صفحة اكتشف نفسك أو أسلوب تعلمك."
            );
        }
    }

    // =====================================
    // 4. صفحة إنشاء الحساب
    // =====================================

    let registerForm = document.querySelector(
        'form input[name="confirm_password"]'
    );

    if (registerForm) {

        let form = registerForm.closest("form");

        form.addEventListener("submit", function (event) {

            let password = form.querySelector(
                'input[name="password"]'
            ).value;

            let confirmPassword = registerForm.value;

            let oldMessage = form.querySelector(".js-message");
            if (oldMessage) oldMessage.remove();

            if (password.length < 8) {
                event.preventDefault();
                let message = createMessage(
                    form,
                    "كلمة المرور يجب أن تكون 8 أحرف على الأقل.",
                    "#ffaaaa"
                );
                message.className = "js-message";
                return;
            }

            if (password !== confirmPassword) {
                event.preventDefault();
                let message = createMessage(
                    form,
                    "كلمتا المرور غير متطابقتين. حاولي مرة أخرى.",
                    "#ffaaaa"
                );
                message.className = "js-message";
                return;
            }

            event.preventDefault();

            let message = createMessage(
                form,
                "تم التحقق من البيانات بنجاح! إنشاء الحساب وحفظه فعلياً سيتم في مرحلة PHP.",
                "#a9ffd0"
            );
            message.className = "js-message";
        });
    }

    // =====================================
    // 5. صفحة تسجيل الدخول
    // =====================================

    let loginForm = document.querySelector(
        'form input[name="email"]'
    );

    if (
        loginForm &&
        document.title.includes("تسجيل الدخول")
    ) {
        let form = loginForm.closest("form");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let oldMessage = form.querySelector(".js-message");
            if (oldMessage) oldMessage.remove();

            let message = createMessage(
                form,
                "تم إدخال البيانات. التحقق الحقيقي من الحساب وتسجيل الدخول سيتم في مرحلة PHP.",
                "#a9ffd0"
            );

            message.className = "js-message";
        });
    }

    // =====================================
    // 6. رسالة ترحيب في الصفحة الرئيسية
    // =====================================

    if (document.body.classList.contains("page-home")) {

        let startLink = document.querySelector(
            'a[href="discover.html"]'
        );

        if (startLink) {
            startLink.addEventListener("click", function () {
                console.log("مرحباً بك في رحلة شِفرة!");
            });
        }
    }

});
          
