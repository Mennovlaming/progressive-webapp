import renderData from "./render.js";

window.handleSearchChange = (val) => {
    const filteredArticles = articles.filter(x => 
        //x = zoektermen toLowerCase
        
        // x.productionPlaces.toLowerCase().includes(val.toLowerCase()) ||
        x.principalOrFirstMaker.toLowerCase().includes(val.toLowerCase()) ||
        x.title.toLowerCase().includes(val.toLowerCase())
        );
        
    renderData(filteredArticles);
}