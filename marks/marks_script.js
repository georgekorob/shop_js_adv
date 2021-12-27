document.getElementById('file_button').addEventListener('click', function () {
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        let text_orig = reader.result;
        const regexp = /[^\w](')/gm;
        let text_correct = text_orig.replaceAll(regexp, '"');
        document.querySelector('.original').textContent = text_orig;
        document.querySelector('.correct').textContent = text_correct;
    }
    reader.onerror = function () {
        console.log(reader.error);
    }
})
