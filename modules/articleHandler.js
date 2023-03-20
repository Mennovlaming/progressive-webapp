import $ from "./querySelector.js"

export const addHashEvent = () => {
    const onHashChangeHandler = (e) => {
        // removes #
        //                "#test123".substring() =
        const articleId = location.hash.substring(1,location.hash.length);

        const article = window.articles.find(x => x.id == articleId);
        if(article) {
            const section = $('body');
            section.insertAdjacentHTML ("beforeend", `
            <div id="article-screen">
           
            <article>
                <h2>${article.title}</h2>
                <h3>${article.principalOrFirstMaker}</h3>
                <!-- <p>${article.productionPlaces}</p> -->
                
                <img src="${article.webImage.url}" />

            </article>
            <button type="button" onclick="removeArticleScreen()">
                <img src="/images/cancel.png" />
            </button>
            </div>
            `);
        }
        };
        // als de hash veranderd, trigger onHashChangeHandler
    window.onhashchange = onHashChangeHandler;
}

//zoek id article screen, remove die.
window.removeArticleScreen = () => {
    document.getElementById("article-screen").remove();
}
