⚠️ **This repository has moved to Codeberg: https://codeberg.org/cdamian/hell-hole-blocker**

This GitHub repository is archived and no longer maintained here.
# Twitter Hellhole Extension

This is a Firefox extension that replaces all links and embeds pointing to Twitter (twitter.com) or X (x.com) with a "HELL HOLE AVOIDED" placeholder.

## Installation

1.  Open Firefox.
2.  Type `about:debugging` in the address bar and press Enter.
3.  Click on **"This Firefox"** in the sidebar.
4.  Click **"Load Temporary Add-on..."**.
5.  Navigate to this directory (`/home/cdamian/projects/hellhole`) and select the `manifest.json` file.

## Features

*   **Link Replacement**: Scans pages for `<a>` tags linking to `twitter.com` or `x.com`.
*   **Embed Replacement**: Replaces `<iframe>` and `<blockquote>` embeds used by Twitter.
*   **Dynamic Detection**: Uses a `MutationObserver` to detect and replace links/embeds in dynamically loaded content (e.g., infinite scroll).
*   **Hell Hole Theme**: Replaces content with a fiery, dark-themed placeholder.

## Files

*   `manifest.json`: Extension configuration.
*   `content.js`: Main logic for finding and replacing elements.
*   `style.css`: Styling for the placeholder.
*   `icons/icon.svg`: Extension icon.
