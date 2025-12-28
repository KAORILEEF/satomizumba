



  $(".openbtn1").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
      $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
  });
  
  $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
      $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
      $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
  });

  //時間で変わるスライドショー
  $(function(){
    /* --- 変数宣言パート --- */

    /* スライド画像部分を保持する変数//varは変数宣言//div内からimgのクラス名を探す */
    var $slideContents = $(".slide-area").find(".slide-contents");//.find()関数　配列の検索：配列内に指定した値と一致する値があればそれを取得

    /* スライドの枚数を保持する変数 */
    var slideNum = $slideContents.length;//lengthは、主に文字列の長さや配列の要素数を取得

    /* 現在表示しているスライド番号を保持する変数 */
    var nowSlide = 0;

    /* スライド変化にかける時間を保持する変数 */
    var durationSlideFade = 1000;
    // ドット
var $dotArea = $(".slide-dots");

for(var i = 0; i < slideNum; i++){
  $dotArea.append("<span></span>");
}

var $dots = $dotArea.find("span");
$dots.eq(0).addClass("active");


    /* --- 初期設定パート --- */

    /* 最初のスライドを表示させる//.eq()番号を入れて特定の値を取得する//HTML要素.fadeIn( 時間（省略可能） ); */
    $slideContents.eq(nowSlide).fadeIn(durationSlideFade);//imgの中から現在表示しているスライド番号を取得、フェードイン

    /* タイマーをスタートさせる */
    setInterval(showNextSlide, 5000);//setInterval…5000ミリ秒ごとにshowNextSlide関数の処理を繰り返す


    /* --- 関数定義パート --- */

    /* 次のスライドを表示する */
function showNextSlide(){
  var nextSlide = (nowSlide + 1) % slideNum;

  $slideContents.eq(nowSlide).fadeOut(durationSlideFade);
  $slideContents.eq(nextSlide).fadeIn(durationSlideFade);

  // ★ ドット制御
  $dots.removeClass("active");
  $dots.eq(nextSlide).addClass("active");

  nowSlide = nextSlide;
}

});
