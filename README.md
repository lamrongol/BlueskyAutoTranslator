# Blueskyの英語とドイツ語を自動的に翻訳
[にがうりさんのBlueskyに翻訳ボタンを追加するスクリプト](https://greasyfork.org/ja/scripts/467069-blueskytranslatebutton)を元にしました。
日本語文字が含まれてないポストを自動で翻訳します。

既知の問題点：
- 英語とドイツ語以外は翻訳できない
- 翻訳リクエストは間隔を置いてするつもりだったが、sleep()がうまくいかない。ただし英語ポストがそれほど多くないなら問題ない模様。

Greasy Fork: https://greasyfork.org/ja/scripts/472873

2024/08/18 追記---------------------------------------------------------------------------

このスクリプトを使うより、以下のChrome拡張で翻訳言語を「自動検出」にして「ページを翻訳する」ボタンを押す方が良いと思います。

[Linguist - ウェブページ翻訳者](https://chromewebstore.google.com/detail/gbefmodhlophhakmoecijeppjblibmie)
