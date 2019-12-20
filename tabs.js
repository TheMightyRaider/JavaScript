const tabs = document.querySelector(".tabs");
const tabHeader = document.querySelectorAll('[role="tab"]');
const tabDetails = Array.from(document.querySelectorAll('[role="content"]'));
console.log(tabs, tabHeader, tabDetails);

function handleFunction(event) {
  console.log(event.currentTarget);
  tabDetails.forEach(content => {
    content.hidden = true;
  });

  tabHeader.forEach(item => {
    item.setAttribute("aria-selected", false);
  });

  let clickedElement = event.currentTarget;
  clickedElement.setAttribute("aria-selected", true);

  tabDetails.find(item => {
    if (item.getAttribute("aria-labelledby") == clickedElement.id) {
      item.hidden = false;
    }
  });
}

tabHeader.forEach(item => {
  item.addEventListener("click", handleFunction);
});
