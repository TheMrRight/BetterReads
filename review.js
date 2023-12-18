const REVIEW_TEXTAREA = document.getElementById("review_review_usertext");
var BETTER_TOOLS = document.getElementById("better_tools");

const BUTTONS = [
    "bold",
    "italic",
    "underlined",
    "strikethrough",
    "spacing",
    "quote",
    "paragraph",
    "spoiler",
    "link",
    "image",
];

// console.info("Running.");

if (document.getElementById("better_tools") == null) {
    // console.info("Making Toolbar...");

    addStyle();

    BETTER_TOOLS = make_toolBar();
    document.body.appendChild(BETTER_TOOLS);

    const spacer = document.createElement("div");
    spacer.style.minHeight = BETTER_TOOLS.offsetHeight + "px";
    REVIEW_TEXTAREA.parentNode.insertBefore(spacer, REVIEW_TEXTAREA);

    resizeToolbar();
}

// console.log(BETTER_TOOLS);

function make_toolBar() {
    var toolBar = document.createElement("div");
    toolBar.id = "better_tools";

    for (let i = 0; i < BUTTONS.length; i++) {
        var button = document.createElement("button");
        button.id = BUTTONS[i];
        button.innerHTML = `<img src="${browser.runtime.getURL(
            "material_icon/" + BUTTONS[i] + ".svg"
        )}" alt="${BUTTONS[i]}">`;

        button.onclick = buttonAction;
        toolBar.appendChild(button);
    }

    return toolBar;
}

function buttonAction() {
    var prefix = "";
    var suffix = "";

    switch (this.id) {
        case "bold":
            (prefix = "<b>"), (suffix = "</b>");
            break;

        case "italic":
            (prefix = "<i>"), (suffix = "</i>");
            break;

        case "underlined":
            (prefix = "<u>"), (suffix = "</u>");
            break;

        case "strikethrough":
            (prefix = "<s>"), (suffix = "</s>");
            break;

        case "spacing":
            (prefix = "<pre>"), (suffix = "</pre>");
            break;

        case "quote":
            (prefix = "<blockquote>"), (suffix = "</blockquote>");
            break;

        case "paragraph":
            (prefix = "<p>"), (suffix = "</p>");
            break;

        case "spoiler":
            (prefix = "<spoiler>"), (suffix = "</spoiler>");
            break;
    }

    var selectionStart = REVIEW_TEXTAREA.selectionStart;
    var selectionEnd = REVIEW_TEXTAREA.selectionEnd;
    var selectedText = REVIEW_TEXTAREA.value.substring(
        selectionStart,
        selectionEnd
    );

    if (selectedText.slice(-1) == " ") {
        selectionEnd = REVIEW_TEXTAREA.selectionEnd - 1;
        selectedText = REVIEW_TEXTAREA.value.substring(
            selectionStart,
            selectionEnd
        );
    }

    if (selectionStart !== selectionEnd && selectedText.length > 0) {
        const newText = prefix + selectedText + suffix;

        REVIEW_TEXTAREA.value =
            REVIEW_TEXTAREA.value.substring(0, selectionStart) +
            newText +
            REVIEW_TEXTAREA.value.substring(selectionEnd);

        REVIEW_TEXTAREA.selectionStart = selectionStart + prefix.length;
        REVIEW_TEXTAREA.selectionEnd =
            selectionStart +
            prefix.length +
            selectedText.length +
            suffix.length;
    }
}

function addStyle() {
    const linkStyle = document.createElement("link");
    linkStyle.setAttribute("rel", "stylesheet");
    linkStyle.setAttribute("href", browser.runtime.getURL("styles.css"));
    document.head.appendChild(linkStyle);
}

function resizeToolbar() {
    console.log("Resizing");
    if (document.getElementById("better_tools") != null) {
        console.log("Sizing");
        BETTER_TOOLS.style.width = REVIEW_TEXTAREA.offsetWidth + "px";
        BETTER_TOOLS.style.top = (REVIEW_TEXTAREA.offsetTop - BETTER_TOOLS.offsetHeight) + "px";
        BETTER_TOOLS.style.left = REVIEW_TEXTAREA.offsetLeft + "px";
    }
}

window.addEventListener("resize", resizeToolbar);
window.addEventListener("onorientationchange", resizeToolbar);
