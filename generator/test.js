/**
 * Created by Peter on 18.11.2016.
 */
var async = require ( 'async' );
var officegen = require('../n_m/officegen');

var fs = require('fs');
var path = require('path');
var test = require('../models/test.model');

var setSomeSpaces = function(number){
    var spaceString = '';
    for (var i = 0; i < number; i++){
        spaceString += ' ';
    }
    return spaceString;
};

module.exports = function(res,lab, course,user,teacher) {

    var docx = officegen({
        type: 'docx',
        orientation: 'portrait',
        pg_margin: {
            left: 800,
            top: 200,
            right: 800,
            bottom: 800
        }
        // The theme support is NOT working yet...
        // themeXml: themeXml
    });

// Remove this comment in case of debugging Officegen:
// officegen.setVerboseMode ( true );

    docx.on('error', function (err) {
        console.log(err);
    });

    var pHeaderPicture = docx.createP();
    pHeaderPicture.addImage(path.resolve(__dirname, '../public/images/header.png' ));
    pHeaderPicture.addLineBreak();
    pHeaderPicture.addLineBreak();


    var pObj = docx.createP({align: 'center'});

    pObj.addText('МIНIСТЕРСТВО  ОСВIТИ  І  НАУКИ  УКРАЇНИ', {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addText('НАЦІОНАЛЬНИЙ   ТЕХНІЧНИЙ   УНІВЕРСИТЕТ   УКРАЇНИ', {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addText('“КИЇВСЬКИЙ  ПОЛІТЕХНІЧНИЙ  ІНСТИТУТ”', {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addText('Факультет прикладної математики', {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addText('Кафедра програмного забезпечення комп’ютерних систем', {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addText('Лабораторна робота № ' + lab.number, {bold: true, font_face: 'Times New Roman', font_size: 16});
    pObj.addLineBreak();
    pObj.addText('з дисципліни "' + course.name + '"', { font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addText('тема: "' + lab.theme + '"', { font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();



    var table = [
        [{
            val: "Виконав",
            opts: {
                cellColWidth: 6000,
                b: true,
                sz: '28',
                shd: {
                    themeFill: "text1",
                },
                fontFamily: "Times New Roman"
            }
        }, {
            val: "Перевірив",
            opts: {
                b: true,
                shd: {
                    themeFill: "text1",
                }
            }
        }],
        ['студент ' + user.study_year +' курсу', '“____” “____________” ' + course.year + ' р.'],
        ['група ' + user.group_name, 'викладач'],
        [user.surname + ' ' + user.name + ' ' + user.patronymic  , teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic],
        ['Варіант - ' + lab.variant, ''],
    ];


    var tableStyle = {
        t_align: "center",
        tableColWidth: 5800,
        tableSize: 7,
        tableColor: "ada",
        tableAlign: "center",
        tableFontFamily: "Times New Roman",
        borders: {                              //careful use it's override
            size: "10",
            inside:{
                size: "10",
                h: false,
                v: true
            }

        },
        sz: 28

    };

    var pObj = docx.createTable(table, tableStyle);

    var pObj = docx.createP({align: "center"});
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addText('Київ ' + course.year,{font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();
    pObj.addLineBreak();

    var pObj = docx.createP({align: "center"});
    pObj.addText('Мета роботи', {bold: true, font_face: 'Times New Roman', font_size: 14});

    var pObj = docx.createP({align: "center"});
    pObj.addText(lab.aim, {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();

    var pObj = docx.createP({align: "center"});
    pObj.addText('Постановка завдання', {bold: true, font_face: 'Times New Roman', font_size: 14});

    var pObj = docx.createP({align: "center"});
    pObj.addText(lab.task_description, {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();

    var pObj = docx.createP({align: "center"});
    pObj.addText('Лістинг программи', {bold: true, font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();

    pObj.addText(lab.code_examples, {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();

    var pObj = docx.createP({align: "center"});
    pObj.addText('Висновки', {bold: true, font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();

    pObj.addText(lab.summary, {font_face: 'Times New Roman', font_size: 14});
    pObj.addLineBreak();
    pObj.addLineBreak();




    var out = fs.createWriteStream('./out1.docx');

    out.on('error', function (err) {
        console.log(err);
    });

    async.parallel([
        function (done) {
            out.on('close', function () {
                console.log('Finish to create a DOCX file.');
                done(null);
            });
            docx.generate(res);
        }

    ], function (err) {
        if (err) {
            console.log('error: ' + err);
        } // Endif.
    });
};