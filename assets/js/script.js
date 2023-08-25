$(function(){  

    // トップのスライド
    {
      const swiper = new Swiper(".ss23_top", {
        effect: 'fade',
        loop: true,
        loopAdditionalSlides: 1,
        speed: 1000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }    
  
    // スクロールで斜め線表示
    {
      // 読み込み時に画面内にあれば表示
      setTimeout(function(){
        slash();
      }, 1000);

      // スクロールイベント軽減して実行
      $(window).on('scroll', _.throttle(updatePosition, 250));
      function updatePosition() {
        slash();
      }

      // 背景帯のアニメーション付与関数
      function slash(){
        $('.ss23_slash__main').each(function() {

          // スクロール量と要素の位置格納
          const windowHeight = $(window).height();
          const windowTop = $(window).scrollTop();
          const windowCenter = windowTop + (windowHeight / 2);
          const elementTop = $(this).offset().top;

          // 表示領域でアニメーション始動
          if(elementTop <= windowCenter && !$(this).hasClass("ss23_slash__main_on")){
            $(this).addClass('ss23_slash__main_on');
            const $this_img = $(this).siblings(".ss23_slash__img");
            
            setTimeout(function(){
              $this_img.addClass("ss23_slash__img_on");
              $this_img.animate({
                "opacity": "1"
              });
            }, 200);
          }

        });
      }
    }
  
    // スクロールでスクロールトップボタン表示
    {
      // 読み込み時に画面内にあれば表示
      appear();
  
      // スクロールイベント軽減して実行
      $(window).on('scroll', _.throttle(updatePosition, 250));
      function updatePosition() {
        appear();
      }
  
      function appear(){
        const $btn = $(".ss23_scrolltop");
        const topOfScreen = $(window).scrollTop();
    
          if (500 > topOfScreen) {
            $btn.fadeOut();
          }else{
            $btn.fadeIn();
          }
      }
    }
  
    // モーダル
    {
      const $modal = $(".ss23_modal");
      const $imgs = $(".ss23_gallery__item");
      const $img_tags = $(".ss23_gallery__item img");
      const $layer = $(".ss23_modal__layer");
      const $close = $(".ss23_modal__close");
      const $main_img = $(".ss23_modal__img img");
      const $next = $(".ss23_modal__next");
      const $prev = $(".ss23_modal__prev");

      let this_index;
      const img_len = $img_tags.length;

      // モーダル立ち上げ
      $imgs.click(function(){

        // 画像識別
        const this_src = $(this).find("img").attr("src");
        $main_img.attr("src", this_src);

        // 画像のインデックス番号格納
        this_index = $imgs.index($(this))
  
        // モーダル表示
        $layer.show();
        $modal.fadeIn(500);
        setTimeout(function(){
          $layer.fadeOut();
        }, 750)
      });
  
      // 閉じるボタンクリック
      $close.click(function(){
        close_modal();
      });
  
      // 画像以外をクリックでモーダル消す
      $modal.click(function(e){
        // クリックした要素のチェック
        if ($(e.target).is('.ss23_modal__img img, .ss23_modal__prev, .ss23_modal__next, .ss23_modal__close')) {
            return;
        }
        close_modal();
      });

      // モーダルが閉じられる動作
      function close_modal(){
        // モーダルを閉じる
        $modal.fadeOut();
        setTimeout(function(){
          $layer.show();
        }, 500);
        
      }

      // 次へボタンクリック
      $next.click(function(){
        // インデックス番号変更
        if(this_index >= img_len-1){
          this_index = 0;
        }else{
          this_index ++;
        }

        // 画像変更
        change_img();
      });

      // 戻るボタンクリック
      $prev.click(function(){
        // インデックス番号変更
        if(this_index <= 0){
          this_index = img_len-1;
        }else{
          this_index --;
        }

        // 画像変更
        change_img();
      });

      // 画像が切り替わる関数
      function change_img(){
        $main_img.fadeOut();
        setTimeout(function(){
          const this_src = $imgs.eq(this_index).find("img").attr("src");
          $main_img.attr("src", this_src);
        }, 500);
        setTimeout(function(){
          $main_img.fadeIn();
        }, 500);
      }
    }

});