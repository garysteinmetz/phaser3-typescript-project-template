/*
Installation -

(Install Libraries)
npm install js-cookie --save

(Create Images)

*/

import 'phaser';
import 'js-cookie/src/js.cookie.js';
//const Cookies = require('js-cookie/src/js.cookie.js');

declare var Cookies;

const screen_width = 800;
const screen_height = 600;

class ImageHolder {
    private static array: Array<ImageHolder> = [];
    private handle: string;
    private url: string;
    protected constructor(handle: string, url: string) {
        this.handle = handle;
        this.url = url;
        ImageHolder.array.push(this);
    }
    getHandle(): string {
        return this.handle;
    }
    getUrl(): string {
        return this.url;
    }
    //
    public static list(): Array<ImageHolder> {
        //Note - the 'clone' function of the 'lodash' library
        //  could be used to do the following
        //const outValue: Array<ImageHolder> = [];
        //ImageHolder.array.forEach(
        //    val => outValue.push(Object.assign({}, val)));
        //return outValue;
        return ImageHolder.array;
    }
}

class MONSTER_IMAGES extends ImageHolder {
    private constructor(handle: string, url: string) {
        super(handle, url);
    }
}
class WEAPON_IMAGES extends ImageHolder {
    private constructor(handle: string, url: string) {
        super(handle, url);
    }
}
class SPELL_IMAGES extends ImageHolder {
    private constructor(handle: string, url: string) {
        super(handle, url);
    }
}
class ARMOR_IMAGES extends ImageHolder {
    private constructor(handle: string, url: string) {
        super(handle, url);
    }
}
class POTION_IMAGES extends ImageHolder {
    private constructor(handle: string, url: string) {
        super(handle, url);
    }
}
class SCENE_IMAGES extends ImageHolder {
    private constructor(handle: string, url: string) {
        super(handle, url);
    }
    static readonly MAIN = new SCENE_IMAGES("scene1", 'assets/scene1.png');
}

//attack, spell, final boss, upgrade potion, upgrade weapon
//upgrade spell

class TextBox {
    scene: Phaser.Scene;
    rectangle: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
    //
    title: string = "";
    content: string = "";
    //
    constructor(scene: Phaser.Scene, x: number, y: number,
        width: number, height: number) {
        this.scene = scene;
        this.rectangle = this.scene.add.rectangle(
            x + width/2, y + height/2, width, height);
        this.rectangle.setStrokeStyle(1, 0xffffff);
        ////this.rectangle.setAlpha(1);
        //this.text = this.scene.add.text(x, y, "A B");
        //this.text.setFixedSize(width, height);
        //this.text.setAlign('center');
        //this.text.setAlpha(1);
        //this.text.setColor("#FFFFFF");
        //this.text.setText(["A", "B"]);
        //console.log("ZZZ rectangle");
        //const a : Phaser.Types.GameObjects.Text.TextStyle;
        this.text = this.scene.add.text(
            x + width/2, y + height/2, "");
        this.text.setAlign('center');
        //this.text.setFixedSize(width, height);
        this.text.setOrigin(0.5, 0.5);
        //this.text.setStyle({"boundsAlignV" : "middle"});
        //this.text.setOrigin(0.5);
        //this.text.setX(x + width/2);
        //this.text.setY(y + height/2);
        //this.text.setS
    }
    setTitle(title: string) {
        this.setTitleAndContent(title, this.content);
    }
    setContent(content: string) {
        this.setTitleAndContent(this.title, content);
    }
    setTitleAndContent(title: string, content: string) {
        this.title = title;
        this.content = content;
        //console.log("ZZZ update title to " + this.title);
        //console.log("ZZZ update content to " + this.content);
        this.text.setText([this.title, "", this.content]);
        //this.text.updateText();
    }
}

//https://freesound.org/search/?q=fire
class GameScene extends Phaser.Scene {
    constructor(handle: string) {
        super(handle);
    }
}

class Hero {
    private static readonly COOKIE_NAME = "rpgHero";
    //
    //starting values
    version = 1;
    gold = 500;
    health = 20;

    //
    //npm install --save @types/js-cookie
    static load(): Hero {
        let outValue = new Hero();
        //
        const existingHeroJson = Cookies.get(Hero.COOKIE_NAME);
        let existingHero;
        try {
            existingHero = JSON.stringify(existingHeroJson);
        } catch (e) {
            //
        }
        if (existingHero && existingHero.version === outValue.version) {
            outValue = Object.assign(outValue, existingHero);
        }
        return outValue;
    }
    save() {
        Cookies.set(Hero.COOKIE_NAME, JSON.stringify(this));
    }
}
const hero = Hero.load();
console.log("ZZZ Hero is")
console.log(hero);

export default class Demo extends Phaser.Scene {
    //text: Phaser.GameObjects.Text;
    goldBox: TextBox;
    healthBox: TextBox;
    potionBox: TextBox;
    magicBox: TextBox;
    constructor () {
        super("main");
    }
    preload() {
        console.log("ZZZ url - " + SCENE_IMAGES.MAIN.getUrl());
        ImageHolder.list().forEach(
            nextImage => this.load.image(
                nextImage.getHandle(), nextImage.getUrl())
        );
        //this.load.image('scene1', 'assets/scene1.png');
    }
    create () {
        //this.add.text(0, 0, "A B");
        //const image1: Phaser.GameObjects.Image =
        //    this.add.image(screen_width/2, screen_height/2,
        //        SCENE_IMAGES.MAIN.getHandle());
        //
        this.goldBox = new TextBox(this, 0, 400, 200, 100);
        this.healthBox = new TextBox(this, 200, 400, 200, 100);
        this.potionBox = new TextBox(this, 400, 400, 200, 100);
        this.magicBox = new TextBox(this, 600, 400, 200, 100);
        //this.goldBox = this.add.text(0, 0, "Hello World");
        //this.goldBox.setSize
    }
    update() {
        //console.log("ZZZ now update");
        this.goldBox.setTitleAndContent("Gold", "500");
        this.healthBox.setTitleAndContent("Health", "30");
        this.potionBox.setTitleAndContent("Potion", "5");
        this.magicBox.setTitleAndContent("Magic", "5");
    }
}

class DemoOld extends Phaser.Scene
{
    constructor ()
    {
        super('s1');
    }

    image1: Phaser.GameObjects.Image;
    clickCount = 0;

    preload ()
    {
        this.load.image('scene1', 'assets/scene1.png');
    }

    create ()
    {
        this.image1 = this.add.image(screen_width/2, screen_height/2, 'scene1');
        this.image1.setInteractive();
        this.image1.on(Phaser.Input.Events.POINTER_DOWN,
            () => {
                this.clickCount++;
                //
                if (this.clickCount === 2) {
                    console.log("Start Effect - Resize, Shrink By Half");
                    this.image1.setScale(0.5);
                } else if (this.clickCount === 3) {
                    console.log("Start Effect - Rotate, Flip Image Over");
                    this.image1.setRotation(Phaser.Math.DegToRad(180));
                } else if (this.clickCount === 4) {
                    console.log("Start Effect - Set Alpha, Make Half Invisible");
                    this.image1.setAlpha(0.5);
                } else if (this.clickCount === 5) {
                    console.log("Start Effect - Set Horizontal, Move Image Right");
                    this.image1.x = this.image1.x + 100;
                } else if (this.clickCount === 6) {
                    console.log("Start Effect - Change Scene, Display Next Scene");
                    let scene2 = this.scene.add('s2', new AnotherScene(), false);
                    this.scene.switch('s2');
                } else {
                    console.log("First Click - Do Nothing");
                }
            });
        const sprite1: Phaser.GameObjects.Sprite = this.add.sprite(0, 0, null);
        sprite1.setAlpha
        this.add.tween(sprite1);
    }
}

class AnotherScene extends Phaser.Scene {
    //
    constructor ()
    {
        super('s2');
    }

    image2: Phaser.GameObjects.Image;

    preload ()
    {
        this.load.image('scene2', 'assets/scene2.png');
    }

    create ()
    {
        //
        this.image2 = this.add.image(screen_width/2, screen_height/2, 'scene2');
        console.log("Scene 2 has been loaded");
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: screen_width,
    height: screen_height,
    scene: Demo
};

const game = new Phaser.Game(config);