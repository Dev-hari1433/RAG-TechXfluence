function run() {
  let main_parent = document.getElementById("chat-tab").parentNode;

  main_parent.childNodes[0].classList.add("header-bar");
  main_parent.style = "padding: 0; margin: 0";
  main_parent.parentNode.style = "gap: 0";
  main_parent.parentNode.parentNode.style = "padding: 0";

  const version_node = document.createElement("p");
  version_node.innerHTML = "version: KH_APP_VERSION";
  version_node.style = "position: fixed; top: 14px; right: 60px; font-size: 11px; opacity: 0.65; z-index: 90; margin: 0; pointer-events: none;";
  main_parent.appendChild(version_node);

  // add favicon
  const favicon = document.createElement("link");
  // set favicon attributes
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = "/favicon.ico";
  document.head.appendChild(favicon);

  // setup conversation dropdown placeholder
  let conv_dropdown = document.querySelector("#conversation-dropdown input");
  if (conv_dropdown) {
    conv_dropdown.placeholder = "Browse conversation";
  }

  // move info-expand-button
  let info_expand_button = document.getElementById("info-expand-button");
  let chat_info_panel = document.getElementById("info-expand");
  if (info_expand_button && chat_info_panel && chat_info_panel.childNodes.length > 2) {
    chat_info_panel.insertBefore(
      info_expand_button,
      chat_info_panel.childNodes[2]
    );
  }

  // move toggle-side-bar button
  let chat_expand_button = document.getElementById("chat-expand-button");
  let chat_column = document.getElementById("main-chat-bot");
  let conv_column = document.getElementById("conv-settings-panel");

  // move setting close button
  let setting_tab_nav_bar = document.querySelector("#settings-tab .tab-nav");
  let setting_close_button = document.getElementById("save-setting-btn");
  if (setting_close_button && setting_tab_nav_bar) {
    setting_tab_nav_bar.appendChild(setting_close_button);
  }

  // Clean SVG definitions for fallback
  const ICON_SVGS = {
    dark: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`,
    rename: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
    delete: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
    newChat: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    expand: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
  };

  const savedTheme = localStorage.getItem("hariharan_theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark");
    document.documentElement.classList.remove("dark");
  } else if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.documentElement.classList.add("dark");
  }

  function fixIcons() {
    const btnDark = document.getElementById("toggle-dark-button");
    if (btnDark) {
      btnDark.title = "Toggle Light / Dark Mode";
      const img = btnDark.querySelector("img");
      if (!img || img.naturalWidth === 0) {
        btnDark.innerHTML = ICON_SVGS.dark;
      }
      if (!btnDark.dataset.hasThemeHandler) {
        btnDark.dataset.hasThemeHandler = "true";
        btnDark.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isDark = document.body.classList.toggle("dark");
          document.documentElement.classList.toggle("dark", isDark);
          localStorage.setItem("hariharan_theme", isDark ? "dark" : "light");
        }, true);
      }
    }
    const btnNew = document.getElementById("new-conv-button");
    if (btnNew) {
      btnNew.title = "New conversation";
      const img = btnNew.querySelector("img");
      if (!img || img.naturalWidth === 0) {
        btnNew.innerHTML = ICON_SVGS.newChat;
      }
    }
    const btnRename = document.getElementById("btn-conv-rename");
    if (btnRename) {
      btnRename.title = "Rename conversation";
      const img = btnRename.querySelector("img");
      if (!img || img.naturalWidth === 0) {
        btnRename.innerHTML = ICON_SVGS.rename;
      }
    }
    const btnDel = document.getElementById("btn-conv-delete");
    if (btnDel) {
      btnDel.title = "Delete conversation";
      const img = btnDel.querySelector("img");
      if (!img || img.naturalWidth === 0) {
        btnDel.innerHTML = ICON_SVGS.delete;
      }
    }
    const btnInfo = document.getElementById("info-expand-button");
    if (btnInfo) {
      btnInfo.title = "Expand / Collapse Information Panel";
      const img = btnInfo.querySelector("img");
      if (!img || img.naturalWidth === 0) {
        btnInfo.innerHTML = ICON_SVGS.expand;
      }
    }
    const btnChat = document.getElementById("chat-expand-button");
    if (btnChat) {
      btnChat.title = "Toggle sidebar";
      const img = btnChat.querySelector("img");
      if (!img || img.naturalWidth === 0) {
        btnChat.innerHTML = ICON_SVGS.expand;
      }
    }
  }

  fixIcons();
  setInterval(fixIcons, 1000);

  function setupSplitters() {
    const convCol = document.getElementById("conv-settings-panel");
    const chatArea = document.getElementById("chat-area");
    const infoCol = document.getElementById("chat-info-panel");

    if (!convCol || !chatArea || !infoCol) return;

    // Resizer 1: between convCol and chatArea
    if (!document.getElementById("resizer-left") && chatArea.parentNode) {
      const resizerLeft = document.createElement("div");
      resizerLeft.id = "resizer-left";
      resizerLeft.className = "drag-resizer";
      resizerLeft.title = "Drag to resize sidebar";
      chatArea.parentNode.insertBefore(resizerLeft, chatArea);

      let isDragging = false;
      let startX = 0;
      let startWidth = 0;

      resizerLeft.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startWidth = convCol.getBoundingClientRect().width;
        document.body.classList.add("is-resizing");
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const newWidth = Math.max(220, Math.min(600, startWidth + (e.clientX - startX)));
        convCol.style.width = newWidth + "px";
        convCol.style.minWidth = newWidth + "px";
        convCol.style.maxWidth = newWidth + "px";
        convCol.style.flex = "0 0 " + newWidth + "px";
      });

      document.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          document.body.classList.remove("is-resizing");
        }
      });
    }

    // Resizer 2: between chatArea and infoCol
    if (!document.getElementById("resizer-right") && infoCol.parentNode) {
      const resizerRight = document.createElement("div");
      resizerRight.id = "resizer-right";
      resizerRight.className = "drag-resizer";
      resizerRight.title = "Drag to resize Information Panel";
      infoCol.parentNode.insertBefore(resizerRight, infoCol);

      let isDraggingRight = false;
      let startXRight = 0;
      let startWidthRight = 0;

      resizerRight.addEventListener("mousedown", (e) => {
        isDraggingRight = true;
        startXRight = e.clientX;
        startWidthRight = infoCol.getBoundingClientRect().width;
        document.body.classList.add("is-resizing");
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDraggingRight) return;
        const newWidth = Math.max(260, Math.min(window.innerWidth * 0.65, startWidthRight - (e.clientX - startXRight)));
        infoCol.style.width = newWidth + "px";
        infoCol.style.minWidth = newWidth + "px";
        infoCol.style.maxWidth = newWidth + "px";
        infoCol.style.flex = "0 0 " + newWidth + "px";
      });

      document.addEventListener("mouseup", () => {
        if (isDraggingRight) {
          isDraggingRight = false;
          document.body.classList.remove("is-resizing");
        }
      });
    }
  }

  setTimeout(setupSplitters, 400);

  let default_conv_column_width = "300px";
  conv_column.style.width = default_conv_column_width;
  conv_column.style.minWidth = default_conv_column_width;
  conv_column.style.flex = "0 0 " + default_conv_column_width;

  globalThis.toggleChatColumn = () => {
    let isCollapsed = conv_column.style.display === "none" || conv_column.style.width === "0px";
    if (isCollapsed) {
      conv_column.style.display = "flex";
      conv_column.style.width = default_conv_column_width;
      conv_column.style.minWidth = default_conv_column_width;
      conv_column.style.flex = "0 0 " + default_conv_column_width;
    } else {
      conv_column.style.width = "0px";
      conv_column.style.minWidth = "0px";
      conv_column.style.display = "none";
    }
  };

  chat_column.insertBefore(chat_expand_button, chat_column.firstChild);

  // mindmap and citation are placed in quick-setting-controls grid natively

  // move share conv checkbox
  let report_div = document.querySelector(
    "#report-accordion > div:nth-child(3) > div:nth-child(1)"
  );
  let share_conv_checkbox = document.getElementById("is-public-checkbox");
  if (share_conv_checkbox && report_div) {
    let report_btn = report_div.querySelector("button");
    if (report_btn) {
      report_div.insertBefore(share_conv_checkbox, report_btn);
    }
  }

  // create slider toggle safely
  const is_public_checkbox = document.getElementById("suggest-chat-checkbox");
  if (is_public_checkbox) {
    const labels = is_public_checkbox.getElementsByTagName("label");
    const spans = is_public_checkbox.getElementsByTagName("span");
    if (labels.length > 0 && spans.length > 0) {
      const label_element = labels[0];
      const checkbox_span = spans[0];
      const new_div = document.createElement("div");
      label_element.classList.add("switch");
      is_public_checkbox.appendChild(checkbox_span);
      label_element.appendChild(new_div);
    }
  }

  // clpse
  globalThis.clpseFn = (id) => {
    var obj = document.getElementById("clpse-btn-" + id);
    obj.classList.toggle("clpse-active");
    var content = obj.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  };

  // store info in local storage
  globalThis.setStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  globalThis.getStorage = (key, value) => {
    item = localStorage.getItem(key);
    return item ? item : value;
  };
  globalThis.removeFromStorage = (key) => {
    localStorage.removeItem(key);
  };

  // Function to scroll to given citation with ID
  // Sleep function using Promise and setTimeout
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  globalThis.scrollToCitation = async (event) => {
    event.preventDefault(); // Prevent the default link behavior
    var citationId = event.target.getAttribute("id");

    await sleep(100); // Sleep for 100 milliseconds

    // check if modal is open
    var modal = document.getElementById("pdf-modal");
    var citation = document.querySelector('mark[id="' + citationId + '"]');

    if (modal.style.display == "block") {
      // trigger on click event of PDF Preview link
      var detail_elem = citation;
      // traverse up the DOM tree to find the parent element with tag detail
      while (detail_elem.tagName.toLowerCase() != "details") {
        detail_elem = detail_elem.parentElement;
      }
      detail_elem.getElementsByClassName("pdf-link").item(0).click();
    } else {
      if (citation) {
        citation.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  globalThis.fullTextSearch = () => {
    // Assign text selection event to last bot message
    var bot_messages = document.querySelectorAll(
      "div#main-chat-bot div.message-row.bot-row"
    );
    var last_bot_message = bot_messages[bot_messages.length - 1];

    // check if the last bot message has class "text_selection"
    if (last_bot_message.classList.contains("text_selection")) {
      return;
    }

    // assign new class to last message
    last_bot_message.classList.add("text_selection");

    // Get sentences from evidence div
    var evidences = document.querySelectorAll(
      "#html-info-panel > div:last-child > div > details.evidence div.evidence-content"
    );
    console.log("Indexing evidences", evidences);

    const segmenterEn = new Intl.Segmenter("en", { granularity: "sentence" });
    // Split sentences and save to all_segments list
    var all_segments = [];
    for (var evidence of evidences) {
      // check if <details> tag is open
      if (!evidence.parentElement.open) {
        continue;
      }
      var markmap_div = evidence.querySelector("div.markmap");
      if (markmap_div) {
        continue;
      }

      var evidence_content = evidence.textContent.replace(/[\r\n]+/g, " ");
      sentence_it = segmenterEn.segment(evidence_content)[Symbol.iterator]();
      while ((sentence = sentence_it.next().value)) {
        segment = sentence.segment.trim();
        if (segment) {
          all_segments.push({
            id: all_segments.length,
            text: segment,
          });
        }
      }
    }

    let miniSearch = new MiniSearch({
      fields: ["text"], // fields to index for full-text search
      storeFields: ["text"],
    });

    // Index all documents
    miniSearch.addAll(all_segments);

    last_bot_message.addEventListener("mouseup", () => {
      let selection = window.getSelection().toString();
      let results = miniSearch.search(selection);

      if (results.length == 0) {
        return;
      }
      let matched_text = results[0].text;
      console.log("query\n", selection, "\nmatched text\n", matched_text);

      var evidences = document.querySelectorAll(
        "#html-info-panel > div:last-child > div > details.evidence div.evidence-content"
      );
      // check if modal is open
      var modal = document.getElementById("pdf-modal");

      // convert all <mark> in evidences to normal text
      evidences.forEach((evidence) => {
        evidence.querySelectorAll("mark").forEach((mark) => {
          mark.outerHTML = mark.innerText;
        });
      });

      // highlight matched_text in evidences
      for (var evidence of evidences) {
        var evidence_content = evidence.textContent.replace(/[\r\n]+/g, " ");
        if (evidence_content.includes(matched_text)) {
          // select all p and li elements
          paragraphs = evidence.querySelectorAll("p, li");
          for (var p of paragraphs) {
            var p_content = p.textContent.replace(/[\r\n]+/g, " ");
            if (p_content.includes(matched_text)) {
              p.innerHTML = p_content.replace(
                matched_text,
                "<mark>" + matched_text + "</mark>"
              );
              console.log("highlighted", matched_text, "in", p);
              if (modal.style.display == "block") {
                // trigger on click event of PDF Preview link
                var detail_elem = p;
                // traverse up the DOM tree to find the parent element with tag detail
                while (detail_elem.tagName.toLowerCase() != "details") {
                  detail_elem = detail_elem.parentElement;
                }
                detail_elem.getElementsByClassName("pdf-link").item(0).click();
              } else {
                p.scrollIntoView({ behavior: "smooth", block: "center" });
              }
              break;
            }
          }
        }
      }
    });
  };

  globalThis.spawnDocument = (content, options) => {
    let opt = {
      window: "",
      closeChild: true,
      childId: "_blank",
    };
    Object.assign(opt, options);
    // minimal error checking
    if (
      content &&
      typeof content.toString == "function" &&
      content.toString().length
    ) {
      let child = window.open("", opt.childId, opt.window);
      child.document.write(content.toString());
      if (opt.closeChild) child.document.close();
      return child;
    }
  };

  globalThis.fillChatInput = (event) => {
    let chatInput = document.querySelector("#chat-input textarea");
    // fill the chat input with the clicked div text
    chatInput.value = "Explain " + event.target.textContent;
    var evt = new Event("change");
    chatInput.dispatchEvent(new Event("input", { bubbles: true }));
    chatInput.focus();
  };
}
