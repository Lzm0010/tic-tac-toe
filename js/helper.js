/*-----------------
HTML ELEMENT FUNCTIONS
------------------*/

//add the hidden class to any element
function addClass(element, myClass){
  //checks if class attribute doesn't exist or if class does exist but not hidden first.
  if (element.getAttribute("class") == null || element.getAttribute("class").indexOf(myClass) === -1){
    element.className += ` ${myClass}`;
  }
}


//remove the hidden class from any element
function removeClass(element, myClass){
  if (element != null){
    if (element.getAttribute("class").indexOf(myClass) > -1) {
      element.className -= ` ${myClass}`;
    }
  }
}

/*-----------------
ARRAY FUNCTIONS
------------------*/

//check to see if an array contains a subset of numbers passed in
function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(value => {
    return (superset.indexOf(value) >= 0);
  });
}
