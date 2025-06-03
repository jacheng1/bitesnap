"use client";

import { useEffect } from "react";

import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

import "./page.css";

export default function Restaurant() {
  useEffect(() => {
    const $ = (str: string) => document.querySelector(str);

    // @ts-ignore
    if (!window.app) window.app = {};
    // @ts-ignore
    const app = window.app;

    app.carousel = {
      removeClass: function(el: { className: string; classList: { remove: (arg0: string) => void; }; }, classname = '') {
        if (el) {
          if (classname === '') {
            el.className = '';
          } else {
            el.classList.remove(classname);
          }

          return el;
        }
        
        return;
      },
      reorder: function() {
        const carousel = $("#carousel");
        if (!carousel) return;
        const childcnt = carousel.children.length;
        const childs = carousel.children;
        for (let j = 0; j < childcnt; j++) {
          childs[j].dataset.pos = j;
        }
      },
      move: function(el) {
        let selected = el;
        if (typeof el === "string") {
          selected = (el === "next")
            ? ($(".selected" ) && $(".selected")!.nextElementSibling ? $(".selected")!.nextElementSibling : null)
            : ($(".selected") && $(".selected")!.previousElementSibling ? $(".selected")!.previousElementSibling : null);
        }

        const curpos = parseInt(app.selected.dataset.pos);
        const tgtpos = parseInt(selected.dataset.pos);
        const cnt = curpos - tgtpos;
        const dir = (cnt < 0) ? -1 : 1;
        const shift = Math.abs(cnt);

        for (let i = 0; i < shift; i++) {
          const carouselEl = $("#carousel");
          const el = (dir === -1)
            ? (carouselEl ? carouselEl.firstElementChild : null)
            : (carouselEl ? carouselEl.lastElementChild : null);
          if (dir === -1) {
            const carousel = $("#carousel");
            if (carousel) {
              if (el) {
                el.dataset.pos = carousel.children.length;
              }
              const carouselElem = $('#carousel');
              if (carouselElem && el) {
                carouselElem.append(el);
              }
            }
          } else {
            if (el) {
              el.dataset.pos = 0;
              const carouselElem = $('#carousel');
              if (carouselElem) {
                carouselElem.prepend(el);
              }
            }
          }

          app.carousel.reorder();
        }

        app.selected = selected;
        const next = selected.nextElementSibling;
        const prev = selected.previousElementSibling;
        const prevSecond = prev ? prev.previousElementSibling : selected.parentElement.lastElementChild;
        const nextSecond = next ? next.nextElementSibling : selected.parentElement.firstElementChild;

        selected.className = '';
        selected.classList.add("selected");

        app.carousel.removeClass(prev).classList.add('prev');
        app.carousel.removeClass(next).classList.add('next');
        app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");
        app.carousel.removeClass(prevSecond).classList.add("prevLeftSecond");

        app.carousel.nextAll(nextSecond).forEach((item: { className: string; classList: { add: (arg0: string) => void; }; }) => { item.className = ''; item.classList.add('hideRight') });
        app.carousel.prevAll(prevSecond).forEach((item: { className: string; classList: { add: (arg0: string) => void; }; }) => { item.className = ''; item.classList.add('hideLeft') });
      },
      nextAll: function(el) {
        const els = [];
        if (el) {
          while (el = el.nextElementSibling) { els.push(el); }
        }

        return els;
      },
      prevAll: function(el) {
        const els = [];
        if (el) {
          while (el = el.previousElementSibling) { els.push(el); }
        }

        return els;
      },
      keypress: function(e) {
        switch (e.which) {
          case 37:
            app.carousel.move('prev');

            break;
          case 39:
            app.carousel.move('next');

            break;
          default:
            return;
        }

        e.preventDefault();

        return false;
      },
      select: function(e) {
        let tgt = e.target;
        while (!tgt.parentElement.classList.contains('carousel')) {
          tgt = tgt.parentElement;
        }

        app.carousel.move(tgt);
      },
      previous: function() {
        app.carousel.move('prev');
      },
      next: function() {
        app.carousel.move('next');
            } as () => void,
            doDown: function(e: MouseEvent | TouchEvent) {
        app.carousel.state.downX = (e instanceof MouseEvent) ? e.x : (e.touches && e.touches[0].clientX);
            } as (e: MouseEvent | TouchEvent) => void,
            doUp: function(e: MouseEvent | TouchEvent) {
        let direction = 0

        if (app.carousel.state.downX) {
          let upX: number;
          if (e instanceof MouseEvent) {
            upX = e.clientX;
          } else if ('touches' in e && e.changedTouches && e.changedTouches.length > 0) {
            upX = e.changedTouches[0].clientX;
          } else {
            upX = 0;
          }
          direction = (app.carousel.state.downX > upX) ? -1 : 1;
          if (Math.abs(app.carousel.state.downX - upX) < 10) {
            app.carousel.select(e);
            return false;
          }

          if (direction === -1) {
            app.carousel.move('next');
          } else {
            app.carousel.move('prev');
          }

          app.carousel.state.downX = 0;
        }
      },
      init: function() {
        document.addEventListener("keydown", app.carousel.keypress);
        const carouselEl = $("#carousel");
        if (carouselEl) {
          carouselEl.addEventListener("mousedown", app.carousel.doDown);
          carouselEl.addEventListener("touchstart", app.carousel.doDown);
          carouselEl.addEventListener("mouseup", app.carousel.doUp);
          carouselEl.addEventListener("touchend", app.carousel.doUp);
          app.carousel.reorder();
        }
        const prevBtn = $('#prev');
        if (prevBtn) prevBtn.addEventListener("click", app.carousel.previous);
        const nextBtn = $('#next');
        if (nextBtn) nextBtn.addEventListener("click", app.carousel.next);
        app.selected = $(".selected");
      },
      state: {}
    };

    app.carousel.init();
  }, []);

  return (
    <div className="restaurant-page-container">

      {/* Restaurant page header */}
      <div className="restaurant-page-header-row">
        <div>
          <div className="restaurant-page-header">
            In-N-Out Burger
            
            <div className="restaurant-page-subheader">
              Irvine, California
            </div>
          </div>
        </div>

        {/* Restaurant page navigation buttons */}
        <div className="restaurant-page-nav">
          <button className="restaurant-page-nav-btn">Menu</button>
          <button className="restaurant-page-nav-btn">Photos</button>
          <button className="restaurant-page-nav-btn">Reviews</button>
          <button className="restaurant-page-nav-btn">Map</button>
        </div>
      </div>
      
      <div id="carousel" className="carousel">
        <div id='item_1' className="hideLeft">
          <img src="/Restaurant_Food_Photo_1.svg" />
        </div>

        <div id='item_2' className="prevLeftSecond">
          <img src="/Restaurant_Food_Photo_2.svg" />
        </div>

        <div id='item_3' className="prev">
          <img src="/Restaurant_Food_Photo_3.svg" />
        </div>

        <div id='item_4' className="selected">
          <img src="/Restaurant_Food_Photo_4.svg" />
        </div>

        <div id='item_5' className="next">
          <img src="/Restaurant_Food_Photo_5.svg" />
        </div>

        <div id='item_6' className="nextRightSecond">
          <img src="/Restaurant_Food_Photo_6.svg" />
        </div>

        <div id='item_7' className="hideRight">
          <img src="/Restaurant_Food_Photo_7.svg" />
        </div>

        <div id='item_8' className="hideRight">
          <img src="/Restaurant_Food_Photo_8.svg" />
        </div>
      </div>

      {/* Description and action buttons */}
      <div className="restaurant-page-desc-row">
        <div className="restaurant-page-desc">
          Classic burger chain serving customizable burgers, hand-cut fries & shakes.
        </div>
        <div className="restaurant-page-desc-actions">
          <button className="restaurant-page-desc-btn">Check In</button>
          <button className="restaurant-page-desc-btn">Snap a Pic</button>
        </div>
      </div>

      {/* Stats/info row below description */}
      <div className="restaurant-page-info-row">
        <div className="restaurant-page-info-col">
          <span className="restaurant-page-info-main"><span>89%</span> of your friends</span>
          <span className="restaurant-page-info-sub">came back for more</span>
        </div>

        <div className="restaurant-page-info-col">
          <span className="restaurant-page-info-main"><span>2.5x</span> more popular</span>
          <span className="restaurant-page-info-sub">after midnight</span>
        </div>

        <div className="restaurant-page-info-col">
          <span className="restaurant-page-info-right-main">
            <FaMapMarkerAlt className="restaurant-page-info-icon" size={25} />
            Still open if you leave within 10 minutes
          </span>

          <span className="restaurant-page-info-right-sub">
            <FaClock className="restaurant-page-info-icon" size={25} />
            Estimated 6-9 minute wait
          </span>
        </div>
      </div>

      {/* Friends boxes row */}
      <div className="restaurant-page-friends-row">
        <div className="restaurant-page-friend-box">
          <div className="restaurant-page-friend-text">
            “Best burger spot in Irvine! Always fresh and quick.”
          </div>
          <div className="restaurant-page-friend-profile">
            <span className="restaurant-page-friend-name">Gus G.</span>
            <img
              src="/Profile_Picture_2.svg"
              alt="Gus G."
              className="restaurant-page-friend-img"
            />
          </div>
        </div>
        <div className="restaurant-page-friend-box">
          <div className="restaurant-page-friend-text">
            “Love the late-night fries and shakes. Highly recommend!”
          </div>
          <div className="restaurant-page-friend-profile">
            <span className="restaurant-page-friend-name">Bob R.</span>
            <img
              src="/Profile_Picture_3.svg"
              alt="Bob R."
              className="restaurant-page-friend-img"
            />
          </div>
        </div>
        <div className="restaurant-page-friend-box">
          <div className="restaurant-page-friend-text">
            “Great place to hang out with friends after midnight.”
          </div>
          <div className="restaurant-page-friend-profile">
            <span className="restaurant-page-friend-name">Alice T.</span>
            <img
              src="/Profile_Picture_4.svg"
              alt="Alice T."
              className="restaurant-page-friend-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};