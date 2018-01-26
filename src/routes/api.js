/*******************************************************************************
 * Copyright (C) Poolus - All Rights Reserved
 * Written by <frodo@poolus.kr>
 * Created on 2018.01.31
 ******************************************************************************/

/* Local Module */
const createRouter = require('./createRouter');
const AuthApiRouter = require('../apis/auth/api');

const router = createRouter({prefix: ''});

/**
 * @Desc: Auth Logic for User
 */
router.get('/auth/show', AuthApiRouter.getShow);
router.post('/auth/login', AuthApiRouter.setLogin);
router.post('/auth/logout', AuthApiRouter.setLogout);



module.exports = router;