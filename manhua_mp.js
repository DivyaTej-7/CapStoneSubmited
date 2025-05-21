document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./manga_data_full.json');
        let data = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        const Title = urlParams.get('id');

        // Filter data to get the correct manga entry
        data = data.filter((item) => item.Title === Title);

        if (data.length > 0) {
            const manga = data[0]; // Access the first match after filtering

            // Set image source and Title
            document.getElementById("image").setAttribute('src', manga.image_url);
            document.getElementById("image").setAttribute('alt', manga.Title);
            document.getElementById("Title").textContent = manga.Title;

            let count = 1; // Start chapter numbering from 1
            const chapterContainer = document.getElementById("chapters");

            // Create buttons for each chapter
            manga.chapters.map((chapter) => {
                const button = document.createElement('button');
                button.textContent = `Chapter ${count}`;
                button.classList.add('chapter-btn'); // Add the 'chapter-btn' class
                button.onclick = () => showPopup(chapter.title); // Corrected function call
                chapterContainer.appendChild(button);
                count++;
            });
        } else {
            console.error('No manga found with that Title.');
        }

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
});
