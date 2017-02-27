/**
 * Created by abhishekg on 25/02/17.
 */


let selectedItems = [];
//let checkBoxes = [];
let ctrlPressed = false;

let treeViewSource = {
    "source": "AGROSTAR",
    "children": [
        {
            "source": "INHOUSE",
            "children": [
                {
                    "source": "APP",
                    "children": [
                        {
                            "source": "APPRJ",
                            "children": []
                        },
                        {
                            "source": "APPGJ",
                            "children": []
                        },
                        {
                            "source": "APPMH",
                            "children": []
                        }
                    ]
                },
                {
                    "source": "CSR",
                    "children": [
                        {
                            "source": "CSRRJ",
                            "children": []
                        },
                        {
                            "source": "CSRMH",
                            "children": []
                        },
                        {
                            "source": "CSRGJ",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "source": "IFFCO",
            "children": []
        },
        {
            "source": "TATA",
            "children": []
        }
    ]
};

let source = document.createElement('div');
source.setAttribute('id', 'source');

let ul = document.createElement('ul');
ul.style.listStyle = 'none';
document.body.appendChild(source);
source.appendChild(ul);

let result = document.createElement('div');
document.body.appendChild(result);

//recursive function to convert json tree to list view

(function treeToList(sourceTree, parent) {

    let li = document.createElement('li');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = 'sourceElement';
    checkBox.value = sourceTree.source;
    checkBox.id = "cbx"+sourceTree.source;
    li.appendChild(checkBox);

    // checkBoxes.push(checkBox);

    if (sourceTree.children && sourceTree.children.length > 0) {
        let ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.id = sourceTree.source;
        ul.className = "collapse";

        let btn = document.createElement('button');
        btn.name = 'toggle';
        let toggleAttr = document.createAttribute("data-toggle");
        toggleAttr.value = "collapse";
        btn.innerHTML += "+";
        let targetAttr = document.createAttribute("data-target");
        targetAttr.value = "#" + sourceTree.source;
        btn.setAttributeNode(toggleAttr);
        btn.setAttributeNode(targetAttr);


        li.appendChild(btn);
        li.innerHTML += sourceTree.source;
        li.appendChild(ul);
        sourceTree.children.forEach(child => treeToList(child, ul));
    }
    else {
        li.innerHTML += sourceTree.source;
    }


    parent.appendChild(li);

})(treeViewSource, ul);


// adding events to checkbox buttons and DOM.

document.addEventListener("DOMContentLoaded", function (event) {

    let checkBoxes = document.querySelectorAll('input[name=sourceElement]');
    for (var checkBox of checkBoxes) {
        checkBox.addEventListener('change', handleCheckBoxClick);
    }

    let buttons = document.querySelectorAll('button[name=toggle]');
    for (let button of buttons) {
        button.addEventListener('click', handleButtonClick)
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

});


//On check box click, push and pop item(s) from selected items
function handleCheckBoxClick(event) {
    if (event.target.checked) {
        selectedItems.push(event.target.value);

    } else {
        selectedItems.splice(selectedItems.indexOf(event.target.value), 1);
    }

    result.innerHTML = "";
    result.innerHTML = "Selected Items : " + selectedItems.join(",");
}

//On button click, change + to - or vice versa
function handleButtonClick(event) {
    event.target.innerHTML = event.target.innerHTML == "+" ? "-" : "+";
}

function handleKeyDown(event) {
    if (event.ctrlKey) {
        ctrlPressed = true;
    }
    if (ctrlPressed && event.keyCode === 65) {
        selectedItems = [];
        let checkBoxes = document.getElementsByName("sourceElement");
        checkBoxes.forEach(checkBox => {
            checkBox.checked = true;
            checkBox.setAttribute("checked", "true");
            selectedItems.push(checkBox.value);
        });
        result.innerHTML = "";
        result.innerHTML = "Selected Items : " + selectedItems.join(",");
    }

}

function handleKeyUp(event) {
    if (event.ctrlKey || event.keyCode === 17) {
        ctrlPressed = false;
    }
}

