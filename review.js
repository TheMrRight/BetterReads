function buttonAction() {
    console.log(this.id);
    console.log(review_textarea.value);

    var prefix = "";
    var suffix = "";

    switch (this.id) {
        case "bold":
            prefix = "<b>";
            suffix = "</b>";
            break;

        case "italic":
            prefix = "<i>";
            suffix = "</i>";
            break;

        case "underlined":
            prefix = "<u>";
            suffix = "</u>";
            break;

        case "strikethrough":
            prefix = "<s>";
            suffix = "</s>";
            break;

        case "spacing":
            prefix = "<pre>";
            suffix = "</pre>";
            break;

        case "quote":
            prefix = "<blockquote>";
            suffix = "</blockquote>";
            break;

        case "paragraph":
            prefix = "<p>";
            suffix = "</p>";
            break;

        case "spoiler":
            prefix = "<spoiler>";
            suffix = "</spoiler>";
            break;
    }

    var selectionStart = review_textarea.selectionStart;
    var selectionEnd = review_textarea.selectionEnd;
    var selectedText = review_textarea.value.substring(
        selectionStart,
        selectionEnd
    );

    if (selectedText.slice(-1) == " ") {
        selectionEnd = review_textarea.selectionEnd - 1;
        selectedText = review_textarea.value.substring(
            selectionStart,
            selectionEnd
        );
    }

    if (selectionStart !== selectionEnd && selectedText.length > 0) {
        const newText = prefix + selectedText + suffix;

        review_textarea.value =
            review_textarea.value.substring(0, selectionStart) +
            newText +
            review_textarea.value.substring(selectionEnd);

        review_textarea.selectionStart = selectionStart + prefix.length;
        review_textarea.selectionEnd =
            selectionStart +
            prefix.length +
            selectedText.length +
            suffix.length;
    }
}

function make_toolBar() {
    var toolBar = document.createElement("div");
    toolBar.id = "better_tools";

    var buttons = [
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

    for (let i = 0; i < buttons.length; i++) {
        var button = document.createElement("button");
        button.id = buttons[i];
        button.innerHTML = `<img src="${browser.runtime.getURL(
            "material_icon/" + buttons[i] + ".svg"
        )}" alt="${buttons[i]}">`;

        button.onclick = buttonAction;
        toolBar.appendChild(button);
    }

    return toolBar;
}

function addStyle() {
    const linkStyle = document.createElement("link");
    linkStyle.setAttribute("rel", "stylesheet");
    linkStyle.setAttribute("href", browser.runtime.getURL("styles.css"));
    document.head.appendChild(linkStyle);
}

function RUN() {
    console.info("Running");

    globalThis.review_textarea = document.getElementById(
        "review_review_usertext"
    );

    var toolBar = document.getElementById("better_tools");
    if (toolBar == null) {
        console.info("Making Toolbar");

        addStyle();
        var toolBar = make_toolBar();
        toolBar.style.position = "absolute !important";
        toolBar.style.width = review_textarea.offsetWidth + "px";
        toolBar.style.top = review_textarea.offsetTop + "px";
        toolBar.style.left = review_textarea.offsetLeft + "px";

        const spacer = document.createElement("div");
        spacer.style.minHeight = "40px";

        review_textarea.parentNode.insertBefore(spacer, review_textarea);
        document.body.appendChild(toolBar);
    }

    console.log(toolBar);
    console.info("End");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", RUN);
} else {
    RUN();
}
