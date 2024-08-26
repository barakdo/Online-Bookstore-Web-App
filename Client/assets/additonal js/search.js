
$(document).ready(function () {
        $('#searchBtn').click(function(event) {  
            if(document.getElementById("searchFor1").value == 'author' || document.getElementById("searchFor").value == 'author'){ 
            event.preventDefault();      
            const params = $.param({
                searchStr: document.getElementById("searchStr").value
            });
            window.location.href = 'authors.html?' + params;
            }
            else{
                event.preventDefault();      
                const params = $.param({
                    searchFor: document.getElementById("searchFor").value,
                    searchStr: document.getElementById("searchStr").value
                });
                window.location.href = 'shop-list.html?' + params;
            }
        });
        $('#searchBtn1').click(function(event) {  
            if(document.getElementById("searchFor1").value == 'author' || document.getElementById("searchFor").value == 'author'){ 
            event.preventDefault();      
            const params = $.param({
                searchStr: document.getElementById("searchStr1").value
            });
            window.location.href = 'authors.html?' + params;
            }
            else{
                event.preventDefault();      
                const params = $.param({
                    searchFor: document.getElementById("searchFor1").value,
                    searchStr: document.getElementById("searchStr1").value
                });
                window.location.href = 'shop-list.html?' + params;
            }
        });
    
    
});