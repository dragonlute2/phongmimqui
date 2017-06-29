var express = require('express'),
    product = require('../models/sanphamRepo'),
    q = require('q'),
taikhoan=require('../models/taikhoanRepo');

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

            res.render('Nhóm sản phẩm/nhom_san_pham_bac1', {
                layoutModels: res.locals.layoutModels,
                productsBac1: data.list,
                isEmpty: data.total === 0,
                catId: req.params.id,
                catName: data.name,
                nameBac2: data.nameBac2,

                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,

            });

        });
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

                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,

            });

        });
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

                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,

            });

        });
});
productController.get('/detail/:id', function(req, res) {
    q.all([ product.loadSanPham(req.params.id)])
        .spread(function(pro){
            var entity={
                id:pro.list.idnguoiban
            }
            console.log(entity);
            taikhoan.loadchitiet(entity).then(function (rows) {
                if (pro) {
                    if(req.session.user == null)
                    {
                        res.render('nhóm sản phẩm/sản phẩm chi tiết/chi_tiet_san_pham', {
                            layoutModels: res.locals.layoutModels,
                            product: pro.list,
                            isDauGiaNull: pro.list.userDauGia === null,
                            isGiaMuaLienNull: pro.list.giamualien === null,
                            chiTietDauGia: pro.chiTietDauGia,
                            chitiet:rows
                        });
                    }
                    else {
                        res.render('nhóm sản phẩm/sản phẩm chi tiết/chi_tiet_san_pham', {
                            layoutModels: res.locals.layoutModels,
                            product: pro.list,
                            isNguoiBan: pro.idBan === req.session.user.id,
                            isDauGiaNull: pro.list.userDauGia === null,
                            isGiaMuaLienNull: pro.list.giamualien === null,
                            chiTietDauGia: pro.chiTietDauGia,
                            chitiet:rows
                        });
                    }

                }
                else {
                    res.redirect('/');
                }
            })

        });

});
module.exports = productController;