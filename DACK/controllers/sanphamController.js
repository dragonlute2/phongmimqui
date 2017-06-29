var express = require('express'),
    product = require('../models/sanphamRepo');

var productController = express.Router();

productController.get('/:id', function(req, res) {

    var rec_per_page = 10;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    product.loadTrangBac1(req.params.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }
            if(req.session.user == null)
            {
                res.render('Nhóm sản phẩm/nhom_san_pham_bac1', {
                    layoutModels: res.locals.layoutModels,
                    productsBac1: data.list,
                    isEmpty: data.total === 0,
                    catId: req.params.id,
                    catName: data.name,
                    nameBac2: data.nameBac2,
                    sanphamyeuthich: req.session.sanphamyeuthich,

                    pages: pages,
                    curPage: curPage,
                    prevPage: curPage - 1,
                    nextPage: curPage + 1,
                    showPrevPage: curPage > 1,
                    showNextPage: curPage < number_of_pages - 1,

                });
            }
            else {
                res.render('Nhóm sản phẩm/nhom_san_pham_bac1', {
                    layoutModels: res.locals.layoutModels,
                    productsBac1: data.list,
                    isEmpty: data.total === 0,
                    catId: req.params.id,
                    catName: data.name,
                    nameBac2: data.nameBac2,
                    idDangNhap: req.session.user.id,
                    sanphamyeuthich: req.session.sanphamyeuthich,
                    pages: pages,
                    curPage: curPage,
                    prevPage: curPage - 1,
                    nextPage: curPage + 1,
                    showPrevPage: curPage > 1,
                    showNextPage: curPage < number_of_pages - 1,

                });
            }



        });
});
productController.post('/:id', function(req, res) {
    var id = req.query.id;
    var x = req.body.sanphamyeuthich;
    var sanpham = [];
    for (var i = 0; i < x.length; i++) {

        sanpham.push({
            idUser: req.session.user.id,
            idSanPham: x[i].slice(5, x[i].length)
        });
    }
    for(var i = 0; i < sanpham.length; i++)
    {
        var entity={
            idUser:sanpham[i].idUser,
            idSanPham:sanpham[i].idSanPham
        }
        product.them(entity).then(function (affe)
        {
        });
    }
    res.redirect('/');

});
productController.get('/sanphamloai2/:id', function(req, res) {

    var rec_per_page = 10;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    product.loadTrangBac2(req.params.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('Nhóm sản phẩm/nhom_san_pham_bac2', {
                layoutModels: res.locals.layoutModels,
                productsBac2: data.list,
                isEmpty: data.total === 0,
                catId: req.params.id,
                nameBac1: data.nameBac1,
                nameBac2: data.nameBac2,
                nameBac3: data.nameBac3,
                sanphamyeuthich: req.session.sanphamyeuthich,
                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,

            });

        });
});
productController.post('/sanphamloai2/:id', function(req, res) {
    var id = req.query.id;
    var x = req.body.sanphamyeuthich;
    var sanpham = [];
    for (var i = 0; i < x.length; i++) {

        sanpham.push({
            idUser: req.session.user.id,
            idSanPham: x[i].slice(5, x[i].length)
        });
    }
    for(var i = 0; i < sanpham.length; i++)
    {
        var entity={
            idUser:sanpham[i].idUser,
            idSanPham:sanpham[i].idSanPham
        }
        product.them(entity).then(function (affe)
        {
        });
    }
    res.redirect('/');

});
productController.get('/sanphamloai2/sanphamloai3/:id', function(req, res) {

    var rec_per_page = 10;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    product.loadTrangBac3(req.params.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('Nhóm sản phẩm/nhom_san_pham_bac3', {
                layoutModels: res.locals.layoutModels,
                productsBac2: data.list,
                isEmpty: data.total === 0,
                catId: req.params.id,
                nameBac1: data.nameBac1,
                nameBac2: data.nameBac2,
                nameBac3: data.nameBac3,
                sanphamyeuthich: req.session.sanphamyeuthich,

                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,

            });

        });
});
productController.post('/sanphamloai2/sanphamloai3/:id', function(req, res) {
    var id = req.query.id;
    var x = req.body.sanphamyeuthich;
    var sanpham = [];
    for (var i = 0; i < x.length; i++) {

        sanpham.push({
            idUser: req.session.user.id,
            idSanPham: x[i].slice(5, x[i].length)
        });
    }
    for(var i = 0; i < sanpham.length; i++)
    {
        var entity={
            idUser:sanpham[i].idUser,
            idSanPham:sanpham[i].idSanPham
        }
        product.them(entity).then(function (affe)
        {
        });
    }
    res.redirect('/');

});
productController.get('/detail/:id', function(req, res) {
    product.loadSanPham(req.params.id)
        .then(function(pro) {
            if (pro) {
                res.render('nhóm sản phẩm/sản phẩm chi tiết/chi_tiet_san_pham', {
                    layoutModels: res.locals.layoutModels,
                    product: pro.list,
                    isNguoiBan: pro.idBan === req.session.user.id,
                    isDauGiaNull: pro.list.userDauGia === null,
                    isGiaMuaLienNull: pro.list.giamualien === null,
                    chiTietDauGia: pro.chiTietDauGia,
                    sanphamyeuthich: req.session.sanphamyeuthich,
                });
            }
            else {
                res.redirect('/');
            }
            console.log(pro.chiTietDauGia)


        });

});

module.exports = productController;