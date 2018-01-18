
document.addEventListener('DOMContentLoaded', function() {
	console.log("DOM fully loaded and parsed!");

//--------------------------------------------------------//
//--------------Manage menu-------------------------------//
//--------------------------------------------------------//


//
/**
* Events handler for main navigation menu
* @param {string} moveover - event type
* @param {string} moveout - event type
* @param {string} className - class name of navigation elements (li elements)
*/
function manageMenu(moveover,moveout,className){
	var navigation = document.querySelectorAll(className);
	for(var i=0;i<navigation.length;i++){
		navigation[i].addEventListener(moveover,function(){
			var subActive = this.lastElementChild;
			if(subActive.tagName === 'UL'){
				subActive.style.display = 'block';
			}
		});
		navigation[i].addEventListener(moveout,function(){
			var subDisabled = this.lastElementChild;
			if(subDisabled.tagName === 'UL'){
				subDisabled.style.display = 'none';
			}
		});
	}
}


//--------------------------------------------------------//
//Slider--------------------------------------------------//
//--------------------------------------------------------//
/**
* Infinity Slider manager with two buttons
* @param {string} nextId - button next Id
* @param {string} previousId - button previous Id
* @param {string} slideElements - class name of li elements with slides
* @param {string} show - class name to show elements
* @param {string} hide - class name to hide elements
*/
function manageSlider(nextId,previousId,slideElements,show,hide){
	var nextButton = document.getElementById(nextId);
	var previousButton = document.getElementById(previousId);
	var slideList = document.querySelectorAll(slideElements);
	var index=0;


	//Automatic slide show anonymous function
	var nextSlide = function(){
		slideList[index].classList.remove(show);
		slideList[index].classList.add(hide);
		if(index===slideList.length-1){
			index = 0;
		}
		else{
			index++;
		}
		slideList[index].classList.remove(hide);
		slideList[index].classList.add(show);
	}
	//Start slide show
	slideList[0].classList.add(show);
	var slideShow = setInterval(nextSlide,5000);

	nextButton.addEventListener('click',function(){
		clearInterval(slideShow); //turn off automatic slide show
		nextSlide();
		slideShow = setInterval(nextSlide,5000); //turn on automatic slide show
	});

	previousButton.addEventListener('click',function(){
		clearInterval(slideShow); //turn off automatic slide show
		slideList[index].classList.remove(show);
		slideList[index].classList.add(hide);
		if(index>0){
			index--;
		}
		else{
			index=slideList.length-1;
		}
		slideList[index].classList.remove(hide);
		slideList[index].classList.add(show);
		slideShow = setInterval(nextSlide,5000); //turn on automatic slide show
	});
}


//--------------------------------------------------------//
//-------------Hide Headers-------------------------------//
//--------------------------------------------------------//
/**
* Function responsible for handling events with header disapiring on images in section2
* @param {string} moveover - event type
* @param {string} moveout - event type
* @param {string} imgBoxes - boxes with images and header on it to hide
*/
function hiddenHeader(moveover,moveout,imgBoxes){
	var boxes = document.querySelectorAll(imgBoxes);
	for(var i=0;i<boxes.length;i++){
		boxes[i].addEventListener(moveover,function(){
			this.lastElementChild.style.display = 'none';
			this.style.overflow = 'hidden';
			this.firstElementChild.style.transform = 'scale(1.05,1.05)';
			this.firstElementChild.style.transition = '1s';
		});
		boxes[i].addEventListener(moveout,function(){
			this.lastElementChild.style.display = 'block';
			this.firstElementChild.style.transform = 'scale(1,1)';
			this.firstElementChild.style.transition = '1s';
		});
	}
}


//-----------------BURGER----------------------//
//Navigation for RWD --------------------------//
//---------------------------------------------//
/**
* Set navigation view on main site when changing screen resolution
* @param {variable} breakpoint - breakpoint resolution settings
*/
function burger(breakpoint){
	var lista = document.getElementById('nav');
	var button = document.getElementById('burger');
	var mobile = breakpoint;


	/**
	* Function setups navigation view for start screen resolution
	* @param {string} set
	* @param {string} flex
	*/
	function changeView(set,flex){
		var navListt = document.querySelectorAll('.head__nav__li');
		for(var i=0; i<navListt.length; i++){
			navListt[i].style.display = set;
			var navContainer = document.querySelector('.head__nav');
			navContainer.style.justifyContent = flex;
		}
	}


	//1. Checking start setup for the screen when browser starts
	if(window.innerWidth>=703){
		lista.style.display = 'block';
		button.style.display = "none";
		changeView('inline-block','flex-end');
	}
	else{
		lista.style.display = 'none';
		button.style.display = "inline-block";
		changeView('block','flex-start');
	}

	//2.Set button event handler when click on it - show/hide list
	button.addEventListener('click',function(){
		if(lista.style.display==='block'){
			lista.style.display='none';
		}
		else{
			lista.style.display='block';
		}
	});

	//3.Checking if screen resolution was changed
	mobile.addListener(	function(mobile)	{
		if(mobile.matches){  //screen resolution is smaller than breakpoint
			lista.style.display = 'none';
			button.style.display = "inline-block";
			changeView('block','flex-start');   //new setup
		}
		else { //screen resolution is higher than breakpoint
			lista.style.display = "block";
			button.style.display = "none";
			changeView('inline-block','flex-end');  //new setup
		}
	});
}

/**
*Calculator of chair cost with custom elements
*
*/
function calculator(){
    //VARIABLES
    //List Ids
    var chairType = document.getElementById('chairType');
    var chairColor = document.getElementById('chairColor');
    var chairFactory = document.getElementById('chairFactory');
    //List Elements
    var chairTypeElements = chairType.children;
    var chairColorElements = chairColor.children;
    var chairFactoryElements = chairFactory.children;
    //List button Ids
    var chairTypeButton = document.getElementById('chairTypeButton');
    var chairColorButton = document.getElementById('chairColorButton');
    var chairFactoryButton = document.getElementById('chairFactoryButton');
    //Transport checkbox
    var checkboxTransport = document.getElementById('transport');
    //Costs
    var totalCost = 0;
    var typeCost = 0;
    var colorCost = 0;
    var factoryCost = 0;
    var transport = 0;


    //Tables with prices
    var typePrice = [{name:'Chair Clair', price:200},
                      {name:'Chair Margarita', price:220},
                      {name:'Chair Selena', price:240}];

    var colorPrice = [{name:'Czerwony',price:80},
                      {name:'Czarny',price:90},
                      {name:'Pomarańczowy',price:100}];

    var factoryPrice = [{name:'Tkanina',price:80},
                        {name:'Skóra',price:160}];

    //clients chair order (0 - name; 1 - color; 2 - factory)
    var clientOrder = [];


    /**
    * Prints choosen chair elements information in summary field and saves
    * order informaiton in order table.
    * @param {string} lable - id of lable field
    * @param {number} index - id of order table element with place for new information
    * @param {string} summaryName - id of summary element name field
    * @param {string} summaryPrice - id of summary element price field
    * @param {variable} cost - global element cost container
    */
    function printOrder(lable,index,summaryName,summaryPrice,cost){
        var elementSummaryName = document.getElementById(summaryName);
        var elementSummaryPrice = document.getElementById(summaryPrice);
        var elementLable = document.getElementById(lable);
        elementLable.innerText = clientOrder[index];
        elementLable.style.color = '#24ba9f';
        elementSummaryName.innerText = clientOrder[index];
        elementSummaryPrice.innerText = cost;
    }


    /**
    * Prints transport information in summary field
    * @param {string} contentName
    * @param {variable} contentPrice
    */
    function printTransport(contentName,contentPrice){
        transportSummaryName.innerText = contentName;
        transportSummaryPrice.innerText = contentPrice;
    }


    /**
    * Calculates total cost ordered chair from sum of elements price
    */
    function caclulateTotalCost(){
        var summaryCost = document.getElementById('summaryCost');
        totalCost = typeCost + colorCost + factoryCost + transport;
        summaryCost.innerText = totalCost;
    }


    /**
    * Display drop down menu - on/off
    * @param {table} listId
    */
    function display(listId){
        if(listId.style.display === 'block'){
            listId.style.display = 'none';
        }
        else{
            listId.style.display = 'block';
        }
    }

    //Event click - arrow button for list chairType (drop down menu show on)
    chairTypeButton.addEventListener('click',function(){
        display(chairType);
    });


    //Event click - arrow button for list chairColor (drop down menu show on)
    chairColorButton.addEventListener('click',function(){
        display(chairColor);
    });


    //Event click - arrow button for list chairFactory (drop down menu show on)
    chairFactoryButton.addEventListener('click',function(){
        display(chairFactory);
    });


    //-------------------------------------------------
    //Event handlers for select lists
    for(var i=0; i<chairTypeElements.length; i++){    //Select type
        chairTypeElements[i].addEventListener('click',function(){
            for(var j=0; j<typePrice.length; j++){
                if(this.dataset.id === typePrice[j].name){
                    typeCost = (typePrice[j].price);
                    clientOrder[0] = typePrice[j].name;
                    printOrder('typeLable',0,'typeSummaryName','typeSummaryPrice',typeCost);
                    caclulateTotalCost();
                }
            }
            chairType.style.display = 'none';
        });
    }

    for(var i=0; i<chairColorElements.length; i++){    //Select color
        chairColorElements[i].addEventListener('click',function(){
            for(var j=0; j<colorPrice.length; j++){
                if(this.dataset.id === colorPrice[j].name){
                    colorCost = (colorPrice[j].price);
                    clientOrder[1] = colorPrice[j].name;
                    printOrder('colorLable',1,'colorSummaryName','colorSummaryPrice',colorCost);
                    caclulateTotalCost();
                }
            }
            chairColor.style.display = 'none';
        });
    }

    for(var i=0; i<chairFactoryElements.length; i++){   //Select factory
        chairFactoryElements[i].addEventListener('click',function(){
            for(var j=0; j<factoryPrice.length; j++){
                if(this.dataset.id === factoryPrice[j].name){
                    factoryCost = (factoryPrice[j].price);
                    clientOrder[2] = factoryPrice[j].name;
                    printOrder('factoryLable',2,'factorySummaryName','factorySummaryPrice',factoryCost);
                    caclulateTotalCost();
                }
            }
            chairFactory.style.display = 'none';
        });
    }

    checkboxTransport.addEventListener('click',function(){  //Checking if tranport is ordered
        var transportSummaryPrice = document.getElementById('transportSummaryPrice');
        var transportSummaryName = document.getElementById('transportSummaryName');
        if(checkboxTransport.checked === true){
            transport = parseInt(checkboxTransport.dataset.transportPrice);
            caclulateTotalCost();
            printTransport('Transport',transport);
        }
        else{
            transport = 0;
            caclulateTotalCost();
            printTransport('','');
        }
    });
}
calculator();

//Brakpoint settings for burger display
var	mob = window.matchMedia("screen and (max-width:703px)");

//Start events listening
manageMenu('mouseover','mouseout','.head__nav__li');
manageSlider('next','previous','.sect1__list__item','slide__visible','slide__hidden');
hiddenHeader('mouseover','mouseout','.sect2__img__box');
burger(mob);

//end of file
});
