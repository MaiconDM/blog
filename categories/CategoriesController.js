const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugfy = require("slugify");
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => {
    const title = req.body.title;
    if (title != undefined) {

        Category.create({
            title: title,
            slug: slugfy(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", { categories: categories });
    })

});

router.post("/categories/delete", adminAuth, (req, res) => {
    let id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories")
            })

        } else {// NÃO FOR UM NÚMERO
            res.redirect("/admin/categories")
        }
    } else { //NULL
        res.redirect("/admin/categories")
    }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    let id = req.params.id;
    if(isNaN(id)) {
        res.redirect("/admin/categories");
    }   

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit", { category: category });
        } else {
            res.redirect("/admin/categories")
        }
    }).catch(erro => {
        res.redirect("/admin/categories")
    })
});

router.post("/categories/update", adminAuth,(req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    Category.update({title: title, slug: slugfy(title)}, {
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/admin/categories")
    })
})
module.exports = router;