import { SampleTheaterWebGL } from './modelstage-sample-web';
import { $ } from 'jquery';

export module modelstageapp {

    export class App {

        private static fadeHandle;
    
        public static fadeNavBar() {
            clearTimeout(App.fadeHandle);
            App.fadeHandle = setTimeout(() => {
                $('nav').addClass('hidden');
            }, 3000);
        }

        public static showNavBar() {
            clearTimeout(App.fadeHandle);
            App.fadeHandle = null;
            $('nav').removeClass('hidden');
        }

        public static toggleSlideOut() {
            $('.menu-button').closest('nav').toggleClass('active');
            $('.menu-slideout').toggleClass('active');
        }

        public init() {
            App.fadeNavBar();
            (<any>window).theater = new SampleTheaterWebGL('viewCanvas');
        }
    }

}

(<any>window).mxapp = modelstageapp;