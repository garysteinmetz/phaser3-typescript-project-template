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
        //this.rectangle.visible = false;
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
        if (this.content) {
            this.text.setText([this.title, "", this.content]);
        } else {
            this.text.setText([this.title]);
        }
        //this.text.updateText();
    }
    setVisible(visible: boolean) {
        this.rectangle.setVisible(visible);
        this.text.setVisible(visible);
    }
}

abstract class Pane {
    private textBoxes: Array<TextBox> = [];
    private visible: boolean = false;
    constructor(visible: boolean) {
        this.visible = visible;
    }
    createTextBox(scene: Phaser.Scene, x: number, y: number,
        width: number, height: number) {
        //
        const textBox = new TextBox(scene, x, y, width, height);
        this.textBoxes.push(textBox);
        return textBox;
    }
    update() {
        this.textBoxes.forEach(
            nextTextBox => {nextTextBox.setVisible(this.visible)});
    }
}

class StatusPane extends Pane {
    //text: Phaser.GameObjects.Text;
    private labelBox: TextBox;
    private goldBox: TextBox;
    private healthBox: TextBox;
    private potionBox: TextBox;
    private magicBox: TextBox;
    private armorBox: TextBox;
    private weaponBox: TextBox;
    private spellBox: TextBox;
    private battleBox: TextBox;
    constructor(scene: Phaser.Scene) {
        super(true);
        this.labelBox = this.createTextBox(scene, 0, 360, 800, 40);
        this.goldBox = this.createTextBox(scene, 0, 400, 200, 100);
        this.healthBox = this.createTextBox(scene, 200, 400, 200, 100);
        this.potionBox = this.createTextBox(scene, 400, 400, 200, 100);
        this.magicBox = this.createTextBox(scene, 600, 400, 200, 100);
        this.armorBox = this.createTextBox(scene, 0, 500, 200, 100);
        this.weaponBox = this.createTextBox(scene, 200, 500, 200, 100);
        this.spellBox = this.createTextBox(scene, 400, 500, 200, 100);
        this.battleBox = this.createTextBox(scene, 600, 500, 200, 100);
    }
    update() {
        super.update();
        this.labelBox.setTitle("Status");
        this.goldBox.setTitleAndContent("Gold", "500");
        this.healthBox.setTitleAndContent("Health", "30");
        this.potionBox.setTitleAndContent("Potion", "5");
        this.magicBox.setTitleAndContent("Magic", "5");
        this.armorBox.setTitleAndContent("Armor", "Plate Armor");
        this.weaponBox.setTitleAndContent("Weapon", "Diamond Sword");
        this.spellBox.setTitleAndContent("Spell", "Fireball");
        this.battleBox.setTitleAndContent("Start Your", "Adventure!");
    }
}

class TownPane extends Pane {
    private labelBox: TextBox;
    private rechargeBox: TextBox;
    private restBox: TextBox;
    private weaponBox: TextBox;
    private armorBox: TextBox;
    private spellBox: TextBox;
    private alchemistBox: TextBox;
    private adventureBox: TextBox;
    private finalBox: TextBox;
    constructor(scene: Phaser.Scene) {
        super(false);
        this.labelBox = this.createTextBox(scene, 500, 0, 300, 40);
        this.rechargeBox = this.createTextBox(scene, 500, 40, 300, 40);
        this.restBox = this.createTextBox(scene, 500, 80, 300, 40);
        this.weaponBox = this.createTextBox(scene, 500, 120, 300, 40);
        this.armorBox = this.createTextBox(scene, 500, 160, 300, 40);
        this.spellBox = this.createTextBox(scene, 500, 200, 300, 40);
        this.alchemistBox = this.createTextBox(scene, 500, 240, 300, 40);
        this.adventureBox = this.createTextBox(scene, 500, 280, 300, 40);
        this.finalBox = this.createTextBox(scene, 500, 320, 300, 40);
    }
    update() {
        super.update();
        this.labelBox.setTitle("Town");
        this.rechargeBox.setTitle("Recharge Spells - 30 GP");
        this.restBox.setTitle("Recover Health - 10 GP");
        this.weaponBox.setTitle("Upgrade Weapon - 50 GP");
        this.armorBox.setTitle("Upgrade Armor - 50 GP");
        this.spellBox.setTitle("Upgrade Spell - 50 GP");
        this.alchemistBox.setTitle("Buy Potion - 20 GP");
        this.adventureBox.setTitle("Fight Monster");
        this.finalBox.setTitle("Fight Final Boss");
    }
}

class BattlePane extends Pane {
    private labelBox: TextBox;
    private potionBox: TextBox;
    private spellBox: TextBox;
    private weaponBox: TextBox;
    constructor(scene: Phaser.Scene) {
        super(true);
        this.labelBox = this.createTextBox(scene, 500, 0, 300, 90);
        this.potionBox = this.createTextBox(scene, 500, 90, 300, 90);
        this.spellBox = this.createTextBox(scene, 500, 180, 300, 90);
        this.weaponBox = this.createTextBox(scene, 500, 270, 300, 90);
    }
    update() {
        super.update();
        this.labelBox.setTitle("Battle with Kobald");
        this.potionBox.setTitle("Use Potion to Heal");
        this.spellBox.setTitle("Cast Attack Spell");
        this.weaponBox.setTitle("Strike with Weapon");
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
    statusPane: StatusPane;
    townPane: TownPane;
    battlePane: BattlePane;
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
        this.statusPane = new StatusPane(this);
        this.townPane = new TownPane(this);
        this.battlePane = new BattlePane(this);
        //this.add.text(0, 0, "A B");
        //const image1: Phaser.GameObjects.Image =
        //    this.add.image(screen_width/2, screen_height/2,
        //        SCENE_IMAGES.MAIN.getHandle());
        //
        //this.goldBox = this.add.text(0, 0, "Hello World");
        //this.goldBox.setSize
    }
    update() {
        this.statusPane.update();
        this.townPane.update();
        this.battlePane.update();
        //console.log("ZZZ now update");
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
        //const sprite1: Phaser.GameObjects.Sprite = this.add.sprite(0, 0, null);
        //sprite1.setAlpha
        //this.add.tween(sprite1);
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
    type: Phaser.CANVAS,
    backgroundColor: '#125555',
    width: screen_width,
    height: screen_height,
    scene: Demo
};

const game = new Phaser.Game(config);