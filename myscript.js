var url = "https://localhost/w/";
window.onload = function()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText)["query"]["data"];
            
            if (data.length > 0)
            {
                for (i = 0; i < data.length; i++) {
                    var property = data[i]["property"].split("#0#")[0];
                    var value = data[i]["dataitem"][0]["item"].split("#0#")[0].split("_").join(" ");
                    
                    switch(property)
                    {
                        case "Title": // Page title.
                            document.getElementsByTagName('h1')[1].innerText = value;
                            break;
                        case "Short": // Short abstract.
                            var e = document.getElementsByClassName('abstr')[0]
                            e.innerHTML = "<h3>Short</h3><div class>" + value + "</div><br>" + e.innerHTML;
                            break;
                    }
                }
            }
            else
                console.log("No data.");
        }
    };
    
    var pageId = window.location.href.split("/").pop();
    xhttp.open("GET", url + "api.php?action=browsebysubject&subject=" + pageId + "&format=json", true);
    xhttp.send();
}