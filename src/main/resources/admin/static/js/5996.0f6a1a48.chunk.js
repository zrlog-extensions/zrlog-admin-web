"use strict";(self.webpackChunkadmin_web_frontend=self.webpackChunkadmin_web_frontend||[]).push([[5996],{45996:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ce});var n=r(6375),a=r(29205),i=r(96185),o=r(68832),l=r(48538),d=r(9039),s=r(87094),c=r(41988),p=r(62215),m=r(78816),g=r(9950),u=r(79378),h=r(27153),x=r(31170),f=r(73965),b=r(73022),y=r(3646),k=r(65455),w=r(46782),j=r(42074),v=r(9636),A=r(1832),B=r(23072),S=r(37596),V=r(46666),P=r(44414);const{Text:$}=y.A,C=e=>{var t;let{data:r,offline:n}=e;const[a,i]=k.A.useModal(),o=(e=>{var t;let i=[{key:"1",label:(0,P.jsxs)(j.N_,{style:{whiteSpace:"nowrap"},to:(0,m.dW)("/user"),onClick:e=>(0,S.hx)(e,a),children:[(0,P.jsx)(u.A,{}),(0,P.jsx)($,{style:{paddingLeft:"5px",paddingRight:16},children:e["admin.user.info"]})]})},{key:"2",label:(0,P.jsxs)(j.N_,{to:(0,m.dW)("/user-update-password"),onClick:e=>(0,S.hx)(e,a),children:[(0,P.jsx)(h.A,{}),(0,P.jsx)($,{style:{paddingLeft:"5px",paddingRight:16},children:e["admin.changePwd"]})]})},{key:"-",label:(0,P.jsx)(B.A,{style:{marginTop:"5px",marginBottom:"5px",userSelect:"none",cursor:"none"}})}];return n||i.push({key:"3",label:(0,P.jsxs)("a",{href:(0,m.XW)()+"admin/logout"+((0,m.M$)()?"?sp=true":""),onClick:e=>(0,S.hx)(e,a),children:[(0,P.jsx)(x.A,{}),(0,P.jsx)($,{style:{paddingLeft:"5px",paddingRight:16},children:e["admin.user.logout"]})]})}),null!==(t=r.lastVersion)&&void 0!==t&&t.upgrade&&(i=[{key:"99",label:(0,P.jsx)(j.N_,{to:(0,m.dW)("/upgrade"),onClick:e=>(0,S.hx)(e,a),children:(0,P.jsxs)(w.A,{dot:!0,styles:{root:{whiteSpace:"nowrap"}},children:[(0,P.jsx)(f.A,{}),(0,P.jsxs)($,{style:{paddingLeft:"6px"},children:[e.newVersion," - (",r.lastVersion.version.version,"#",r.lastVersion.version.type,")"]})]})})},...i]),i})((0,m.jY)()),l=()=>(0,V.BV)().compactMode?32:40;return(0,P.jsxs)(P.Fragment,{children:[i,(0,P.jsx)(v.A,{menu:{items:o},placement:"bottom",children:(0,P.jsxs)("div",{style:{color:(0,V.BV)().dark?"#ffffff":"#333333",marginRight:16,height:50,display:"flex",alignItems:"center"},children:[(0,P.jsx)(A.A,{preview:!1,fallback:m.Ay.getFillBackImg(),className:"userAvatarImg",src:r.header,style:{lineHeight:l(),width:l(),height:l()}}),(0,P.jsx)(w.A,{dot:null===(t=r.lastVersion)||void 0===t?void 0:t.upgrade,children:(0,P.jsx)($,{style:{color:(0,V.BV)().dark?"#ffffff":"#333333",paddingLeft:8},children:r.userName})}),(0,P.jsx)(b.A,{})]})})]})};var z=r(2383),I=r(44669),Y=r(31743);const _=r(24937).Ay.div`
    .ant-layout-header {
        backdrop-filter: blur(10px);

        .dark & {
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(31, 31, 31, 0.98) 100%) !important;
        }
    }

    /* Menu Styling with Modern Effects */

    .ant-menu-inline,
    .ant-menu-vertical,
    .ant-menu-vertical-left {
        border: 0;
    }

    /* Icon adjustments with glow effect */

    .ant-menu-item .anticon,
    .ant-menu-submenu-title .anticon {
        font-size: 22px;
    }

    /* Vertical menu items with stacked icon+text */

    .ant-menu-title-content > a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        gap: 4px;
        background: transparent !important;
    }

    .ant-menu-item a {
        background: transparent !important;
    }

    .ant-menu-item > a > span,
    .ant-menu-submenu-title > span {
    }

    /* Custom heights for top-level menu items */

    .ant-menu-vertical > .ant-menu-item,
    .ant-menu-vertical-left > .ant-menu-item,
    .ant-menu-vertical-right > .ant-menu-item,
    .ant-menu-inline > .ant-menu-item,
    .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
        height: ${e=>e.compactMode?54:68}px;
        line-height: 1.5;
        padding: 0;
        margin-bottom: 6px;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, ${e=>e.colorPrimary}10, transparent);
        }

        &:hover::before {
            left: 100%;
        }
    }

    /* Submenu items - Second level */

    .ant-menu-sub {
        background: transparent !important;
    }

    .ant-menu-submenu {
        display: flex !important;
        justify-content: center !important;
    }

    .ant-menu-sub > .ant-menu-item {
        margin-bottom: 4px;
        margin-left: 0 !important;
        padding-left: 0 !important;
        display: flex !important;
        justify-content: center !important;

        a {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            width: 100%;
            padding: 0 !important;
        }

        .menu-title {
            text-align: center !important;
            margin-left: 0 !important;
            display: block !important;
            font-size: 13px;
            font-weight: 500;
        }

        &:hover {
            background: ${e=>(0,z.b)(e.colorPrimary,.08)} !important;
        }
    }

    .ant-menu-sub .ant-menu-item-selected {
        background: ${e=>(0,z.b)(e.colorPrimary,.16)} !important;
        .menu-title {
            color: ${e=>e.colorPrimary};
            font-weight: 600;
        }
    }

    /* Menu Item shape with glassmorphism */

    .ant-menu .ant-menu-item,
    .ant-menu-submenu-title {
        margin-inline: 12px;
        width: calc(100% - 24px);
    }

    .ant-menu .ant-menu-item {
        position: relative;
    }

    /* Submenu Title */

    .ant-menu-submenu-title > i {
        display: none;
    }

    .ant-menu-submenu-title {
        margin: 0;
    }

    .ant-menu-submenu-title:hover {
        color: inherit;
    }

    h3.page-header {
        margin-top: 24px;
        margin-bottom: 24px;
        padding-left: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* MD3 Headline Large */
        font-size: 32px;
        line-height: 40px !important;
        font-weight: 400;
    }

    .userAvatarImg {
        border-radius: 50%;
        border: 2px solid transparent;
        background: linear-gradient(white, white) padding-box,
            linear-gradient(135deg, ${e=>e.colorPrimary}80, ${e=>e.colorPrimary}40) border-box;

        &:hover {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Soft subtle */
        }
    }

    /* Enhanced hover effects for menu items - MD3 State Layers */

    .ant-menu-item:hover,
    .ant-menu-submenu-title:hover {
        background: ${e=>(0,z.b)(e.colorPrimary,.08)} !important; /* MD3 Hover state layer */
        color: ${e=>e.colorPrimary} !important;
        box-shadow: none;

        .anticon {
            filter: drop-shadow(0 1px 2px ${e=>e.colorPrimary}20);
        }
    }

    .ant-menu-item-selected {
        background: ${e=>(0,z.b)(e.colorPrimary,.12)} !important; /* MD3 Focus/Active state layer */
        color: ${e=>e.colorPrimary} !important;
        font-weight: 600;
        box-shadow: none;

        a {
            background: transparent !important;
        }
    }

    .ant-menu-item-selected a {
        color: ${e=>e.colorPrimary} !important;
        font-weight: 600;
        background: transparent !important;
    }

    /* Premium Cards with elevated design */

    .ant-card {
        border: 1px solid transparent;
        background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 100%);

        &:hover {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
            border-color: rgba(0, 0, 0, 0.06);
        }

        .dark & {
            background: linear-gradient(135deg, rgba(26, 26, 26, 1) 0%, rgba(31, 31, 31, 0.98) 100%);
            border-color: rgba(255, 255, 255, 0.06);

            &:hover {
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4);
                border-color: rgba(255, 255, 255, 0.1);
            }
        }
    }

    .ant-card-head {
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        font-weight: 600;

        .dark & {
            border-bottom-color: rgba(255, 255, 255, 0.08);
        }
    }

    /* Premium Table Design */

    .ant-table {
        overflow: hidden;
        background: white;

        .dark & {
            background: #1a1a1a;
        }

        /* Elegant table header */

        thead > tr > th {
            background: linear-gradient(180deg, #fafbfc 0%, #f7f8fa 100%);
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            color: #3c4043;
            border-bottom: 2px solid #e8eaed;
            padding: 16px;

            &::before {
                display: none;
            }

            .dark & {
                background: linear-gradient(180deg, #1f1f1f 0%, #1a1a1a 100%);
                color: #c4c7cb;
                border-bottom-color: #2a2a2a;
            }
        }

        /* Table rows with elegant spacing */

        tbody > tr {
            border-bottom: 1px solid #f0f0f0;

            > td {
                padding: 16px;
                border-bottom: 1px solid #f0f0f0;
            }

            &:hover {
                background: linear-gradient(
                    90deg,
                    ${e=>e.colorPrimary}05 0%,
                    ${e=>e.colorPrimary}03 100%
                );
                box-shadow: inset 3px 0 0 ${e=>e.colorPrimary};
            }

            &:last-child > td {
                border-bottom: none;
            }

            .dark & {
                border-bottom-color: #2a2a2a;

                > td {
                    border-bottom-color: #2a2a2a;
                }

                &:hover {
                    background: linear-gradient(
                        90deg,
                        ${e=>e.colorPrimary}15 0%,
                        ${e=>e.colorPrimary}08 100%
                    );
                }
            }
        }

        /* Striped rows (subtle) */

        tbody > tr:nth-child(even) {
            background: rgba(0, 0, 0, 0.01);

            .dark & {
                background: rgba(255, 255, 255, 0.02);
            }
        }
    }

    /* Refined Buttons */

    .ant-btn-primary {
        background: linear-gradient(
            135deg,
            ${e=>e.colorPrimary} 0%,
            ${e=>e.colorPrimary}dd 100%
        );
        border: none;
        box-shadow: 0 2px 8px ${e=>e.colorPrimary}30, 0 1px 2px ${e=>e.colorPrimary}20;
        font-weight: 500;
    }

    /* Upload list hidden as per original */

    .ant-upload-list {
        display: none;
    }

    ul {
        margin-bottom: 0;
    }

    /* Typography Overrides */

    .ant-typography h3,
    h3.ant-typography {
        margin-bottom: 0.5em;
        font-weight: 700;
        font-size: 24px;
        line-height: 1.35;
    }

    .ant-typography h4,
    h4.ant-typography {
        margin-bottom: 0.5em;
        font-weight: 600;
        font-size: 20px;
        line-height: 1.4;
    }

    .ant-menu {
        text-align: center;
        box-shadow: none;
    }

    .ant-menu .menu-title {
        margin-left: 0 !important;
        font-size: 12px;
        line-height: 1.2;
        display: block;
        margin-top: 4px;
        font-weight: 500;
    }

    .ant-form-item-explain-error {
        color: #ff4d4f;
    }

    .ant-form-item-has-error .ant-radio-group {
        border: 1px solid #ff4d4f;
    }

    .ant-upload {
        padding: 0 !important;
        box-sizing: content-box;
    }

    /* Refined Input Fields */

    .ant-input,
    .ant-input-number,
    .ant-select-selector {
        &:hover {
            border-color: ${e=>e.colorPrimary}80;
        }

        &:focus,
        &:focus-within {
            border-color: ${e=>e.colorPrimary};
            box-shadow: 0 0 0 3px ${e=>e.colorPrimary}15;
        }
    }

    .ant-typography {
        line-height: 1.65;
    }

    h1.ant-typography,
    .ant-typography h1 {
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    h2.ant-typography,
    .ant-typography h2 {
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    h3.ant-typography,
    .ant-typography h3 {
        font-weight: 600;
    }

    /* Form spacing improvements */

    .ant-form-item {
        margin-bottom: 24px;
    }

    .ant-form-item-label > label {
        font-weight: 500;
        color: #5f6368;

        .dark & {
            color: #9aa0a6;
        }
    }

    /* MD3 Floating Action Button (FAB) */
    .ant-float-btn-body {
        border-radius: 50% !important; /* MD3 circular FAB */
        background: ${e=>e.colorPrimary}20 !important; /* Secondary container default */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ant-float-btn-icon {
        color: ${e=>e.colorPrimary} !important;
        font-size: 24px;
    }

    .ant-float-btn {
        border-radius: 50% !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);

        .dark & {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        &:hover .ant-float-btn-body {
            background: ${e=>(0,z.b)(e.colorPrimary,.3)} !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .dark &:hover .ant-float-btn-body {
            background: ${e=>(0,z.b)(e.colorPrimary,.4)} !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4);
        }
    }

    .ant-float-btn-group {
        border-radius: 50px !important;
        .ant-float-btn-body {
            border-radius: 50px !important;
        }
    }
`;var M=r(16661),R=r(85221),D=r(87085),L=r(97211),T=r(58203),F=r(90582),E=r(50198),H=r(88349),W=r(44373),N=r(9774),O=r(92019),K=r(66276),U=r(95770),X=r(43078),J=r(82278),q=r(52786),G=r(52378),Z=r(62618),Q=r(86699),ee=r(68046),te=r(71420),re=r(75220),ne=r(28429),ae=r(34647);const{useBreakpoint:ie}=G.Ay,oe=()=>{const[e,t]=(0,g.useState)(!1),[r,n]=(0,g.useState)(""),[a,i]=(0,g.useState)(0),[o,l]=(0,g.useState)([]),[d,s]=(0,g.useState)(!1),c=(0,L.DP)(),p=(0,ne.Zp)(),x=(0,g.useRef)(null),f=(0,ae.cz)(),b=[{id:"dashboard",title:(0,m.jY)().dashboard,path:"/",icon:(0,P.jsx)(T.A,{}),keywords:["dashboard","home","index","\u4e3b\u9875","\u9996\u9875","\u4eea\u8868\u76d8"],type:"route"},{id:"write",title:(0,m.jY)().writeArticle,path:"/article-edit",icon:(0,P.jsx)(F.A,{}),keywords:["write","post","new","\u5199\u6587\u7ae0","\u65b0\u5efa","\u53d1\u5e03"],type:"route"},{id:"article",title:(0,m.jY)().blogManage,path:"/article",icon:(0,P.jsx)(E.A,{}),keywords:["article","list","\u6587\u7ae0","\u5217\u8868","\u7ba1\u7406"],type:"route"},{id:"article_draft",title:(0,m.jY)().articleDraft,path:"/article?status=draft",icon:(0,P.jsx)(H.A,{}),keywords:["draft","article","\u8349\u7a3f","\u6587\u7ae0","caogao"],type:"route"},{id:"category",title:(0,m.jY)()["admin.type.manage"],path:"/article-type",icon:(0,P.jsx)(W.A,{}),keywords:["category","type","\u5206\u7c7b","\u7c7b\u522b"],type:"route"},{id:"comment",title:(0,m.jY)()["admin.comment.manage"],path:"/comment",icon:(0,P.jsx)(N.A,{}),keywords:["comment","reply","\u8bc4\u8bba","\u56de\u590d","\u7559\u8a00"],type:"route"},{id:"nav",title:(0,m.jY)()["admin.nav.manage"],path:"/nav",icon:(0,P.jsx)(O.A,{}),keywords:["nav","menu","\u5bfc\u822a","\u83dc\u5355"],type:"route"},{id:"link",title:(0,m.jY)()["admin.link.manage"],path:"/link",icon:(0,P.jsx)(O.A,{}),keywords:["link","friend","\u53cb\u94fe","\u94fe\u63a5"],type:"route"},{id:"website_base",title:(0,m.jY)()["admin.basic.manage"],path:"/website/admin",icon:(0,P.jsx)(K.A,{}),keywords:["setting","base","\u57fa\u672c","\u8bbe\u7f6e","\u914d\u7f6e"],type:"route"},{id:"website_blog",title:(0,m.jY)()["admin.blog.manage"],path:"/website/blog",icon:(0,P.jsx)(K.A,{}),keywords:["blog","setting","\u535a\u5ba2","\u8bbe\u7f6e"],type:"route"},{id:"website_seo",title:(0,m.jY)()["admin.other.manage"],path:"/website/other",icon:(0,P.jsx)(K.A,{}),keywords:["seo","other","setting","\u4f18\u5316"],type:"route"},{id:"website_ai",title:(0,m.jY)()["admin.ai.manage"],path:"/website/ai",icon:(0,P.jsx)(K.A,{}),keywords:["ai","gemini","chatgpt","\u4eba\u5de5\u667a\u80fd"],type:"route"},{id:"theme_center",title:(0,m.jY)().templateCenter,path:"/template-center",icon:(0,P.jsx)(K.A,{}),keywords:["theme","template","\u4e3b\u9898","\u6a21\u677f","\u5916\u89c2"],type:"route"},{id:"theme_setting",title:(0,m.jY)()["admin.template.manage"],path:"/website/template",icon:(0,P.jsx)(K.A,{}),keywords:["theme","setting","\u4e3b\u9898","\u8bbe\u7f6e"],type:"route"},{id:"system",title:(0,m.jY)().systemInfo,path:"/system",icon:(0,P.jsx)(T.A,{}),keywords:["system","info","\u7cfb\u7edf","\u4fe1\u606f","\u73af\u5883"],type:"route"},{id:"user",title:(0,m.jY)()["admin.user.info"],path:"/user",icon:(0,P.jsx)(u.A,{}),keywords:["user","profile","\u4e2a\u4eba","\u4fe1\u606f","\u7528\u6237","\u5934\u50cf"],type:"route"},{id:"pwd",title:(0,m.jY)()["admin.changePwd"],path:"/user-update-password",icon:(0,P.jsx)(h.A,{}),keywords:["password","update","\u5bc6\u7801","\u4fee\u6539","\u5b89\u5168"],type:"route"},{id:"backup",title:(0,m.jY)().backupFiles,path:"/plugin?page=backup-sql-file/files",icon:(0,P.jsx)(U.A,{}),keywords:["backup","restore","sql","\u5907\u4efd","\u6062\u590d","\u6570\u636e\u5e93"],type:"route"},{id:"plugin",title:(0,m.jY)()["admin.plugin.manage"],path:"/plugin",icon:(0,P.jsx)(X.A,{}),keywords:["plugin","\u63d2\u4ef6","chajian"],type:"route"},{id:"version",title:(0,m.jY)()["admin.version"],path:"/website/version",icon:(0,P.jsx)(J.A,{}),keywords:["version","update","\u7248\u672c","\u66f4\u65b0","banben","gengxin"],type:"route"}];(0,g.useEffect)(()=>{const e=e=>{(e.metaKey||e.ctrlKey)&&"k"===e.key&&(e.preventDefault(),t(!0))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]);const[y,w]=(0,g.useState)([]);(0,g.useEffect)(()=>{if(e){n(""),l([]),i(0);try{const e=JSON.parse(localStorage.getItem("zrlog_spotlight_recent")||"[]").map(e=>{let t=(0,P.jsx)(q.A,{});if("article"===e.type)t=(0,P.jsx)(F.A,{});else{const r=b.find(t=>t.id===e.id);r&&(t=r.icon)}return{...e,icon:t,isRecent:!0}});w(e)}catch(t){w([])}setTimeout(()=>{var e;return null===(e=x.current)||void 0===e?void 0:e.focus()},100)}},[e]),(0,g.useEffect)(()=>{if(!r.trim())return l([]),void i(0);const e=setTimeout(async()=>{s(!0);try{const{data:e}=await f.get("/api/admin/article",{params:{key:r,page:1,size:5}});if(e&&e.data&&e.data.rows){const t=e.data.rows.map(e=>({id:`article-${e.id}`,title:e.title,subTitle:e.typeName,path:`/article-edit?id=${e.id}`,icon:(0,P.jsx)(F.A,{}),keywords:[],type:"article"}));l(t)}}catch(e){console.error("Failed to fetch articles",e)}finally{s(!1)}},300);return()=>clearTimeout(e)},[r]);let j=[];if(""===r.trim()){const e=new Set(y.map(e=>e.id)),t=b.filter(t=>!e.has(t.id));j=[...y,...t]}else{const e=b.filter(e=>e.title.toLowerCase().includes(r.toLowerCase())||e.keywords.some(e=>e.toLowerCase().includes(r.toLowerCase())));j=[...e,...o]}const v=e=>{try{const t=JSON.parse(localStorage.getItem("zrlog_spotlight_recent")||"[]"),r=[{id:e.id,title:e.title,subTitle:e.subTitle,path:e.path,type:e.type},...t.filter(t=>t.id!==e.id)].slice(0,5);localStorage.setItem("zrlog_spotlight_recent",JSON.stringify(r))}catch(r){console.error(r)}p((0,m.dW)(e.path)),t(!1)};(0,g.useEffect)(()=>{if(e){const e=document.getElementById(`spotlight-item-${a}`);e&&e.scrollIntoView({block:"nearest"})}},[a,e]);const A="undefined"!==typeof window&&/macintosh|mac os x/i.test(navigator.userAgent),B=ie().xs;return(0,P.jsxs)(P.Fragment,{children:[B?(0,P.jsx)("div",{onClick:()=>t(!0),style:{display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:"50%",cursor:"pointer",marginRight:12,color:(0,V.BV)().dark?"#aaa":"#555"},children:(0,P.jsx)(q.A,{style:{fontSize:18}})}):(0,P.jsx)(Z.A,{onClick:()=>t(!0),onMouseDown:e=>e.preventDefault(),prefix:(0,P.jsx)(q.A,{style:{color:(0,V.BV)().dark?"#888":"#999"}}),suffix:(0,P.jsx)("div",{style:{fontSize:12,border:"1px solid "+((0,V.BV)().dark?"#444":"#ddd"),borderRadius:4,padding:"0 4px",backgroundColor:(0,V.BV)().dark?"rgba(255,255,255,0.05)":"#fafafa",color:(0,V.BV)().dark?"#888":"#999",lineHeight:"18px",userSelect:"none"},children:A?"\u2318 K":"Ctrl K"}),placeholder:(0,m.jY)().search,readOnly:!0,style:{width:220,marginRight:16,cursor:"pointer",caretColor:"transparent"}}),(0,P.jsx)(k.A,{open:e,onCancel:()=>t(!1),footer:null,closable:!1,width:600,style:{top:B?20:100},styles:{mask:{backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",backgroundColor:(0,V.BV)().dark?"rgba(0, 0, 0, 0.45)":"rgba(255, 255, 255, 0.45)"},body:{padding:0}},children:(0,P.jsxs)("div",{style:{padding:0,overflow:"hidden",backgroundColor:(0,V.BV)().dark?"#1f1f1f":"#ffffff",borderRadius:c.borderRadiusLG},children:[(0,P.jsx)("div",{style:{padding:"16px 20px",borderBottom:"1px solid "+((0,V.BV)().dark?"#333":"#f0f0f0")},children:(0,P.jsx)(Z.A,{ref:x,variant:"borderless",prefix:(0,P.jsx)(q.A,{style:{fontSize:20,color:(0,V.BV)().colorPrimary,marginRight:8}}),placeholder:(0,m.jY)().searchTip,value:r,onChange:e=>n(e.target.value),onKeyDown:e=>{"ArrowDown"===e.key?(e.preventDefault(),i(e=>e<j.length-1?e+1:e)):"ArrowUp"===e.key?(e.preventDefault(),i(e=>e>0?e-1:e)):"Enter"===e.key?(e.preventDefault(),j.length>0&&j[a]&&v(j[a])):"Escape"===e.key&&(e.preventDefault(),t(!1))},style:{fontSize:18,padding:0}})}),(0,P.jsxs)("div",{style:{maxHeight:B?"70vh":"60vh",overflowY:"auto",padding:"8px 0"},children:[0!==j.length||d?(0,P.jsx)(Q.A,{dataSource:j,renderItem:(e,t)=>(0,P.jsx)(Q.A.Item,{id:`spotlight-item-${t}`,onClick:()=>v(e),onMouseEnter:()=>i(t),style:{padding:"12px 16px",margin:"4px 12px",cursor:"pointer",borderBottom:"none",borderRadius:c.borderRadius,backgroundColor:t===a?(0,V.BV)().dark?"rgba(255,255,255,0.08)":`${(0,V.BV)().colorPrimary}15`:"transparent",transition:"background-color 0.1s"},children:(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",width:"100%"},children:[(0,P.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,fontSize:20,color:t===a?(0,V.BV)().colorPrimary:(0,V.BV)().dark?"#aaa":"#555",marginRight:12},children:e.icon}),(0,P.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",minWidth:0},children:[(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,overflow:"hidden"},children:[(0,P.jsx)("span",{style:{fontSize:15,fontWeight:t===a?600:400,color:t===a?(0,V.BV)().colorPrimary:(0,V.BV)().dark?"#eee":"#333",lineHeight:1.4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},dangerouslySetInnerHTML:{__html:e.title}}),e.isRecent&&(0,P.jsx)(ee.A,{bordered:!1,color:"default",style:{margin:0,padding:"0 6px",lineHeight:"20px",fontSize:12,flexShrink:0},children:(0,m.jY)().recent}),"article"===e.type&&(0,P.jsx)(ee.A,{bordered:!1,color:"blue",style:{margin:0,padding:"0 6px",lineHeight:"20px",fontSize:12,flexShrink:0},children:(0,m.jY)().article})]}),e.subTitle&&(0,P.jsx)("div",{style:{fontSize:12,color:(0,V.BV)().dark?"#888":"#aaa",marginTop:2,lineHeight:1.2},children:e.subTitle})]}),t===a&&(0,P.jsxs)("div",{style:{color:t===a?(0,V.BV)().colorPrimary:(0,V.BV)().dark?"#888":"#999",fontSize:12,marginLeft:8,opacity:.8},children:["\u21b5 ",(0,m.jY)().pleaseChoose]})]})})}):(0,P.jsx)("div",{style:{padding:32,textAlign:"center",color:(0,V.BV)().dark?"#888":"#999"},children:(0,m.jY)().notFound}),d&&(0,P.jsx)("div",{style:{padding:16,textAlign:"center"},children:(0,P.jsx)(te.A,{size:"small"})})]}),!B&&(0,P.jsxs)("div",{style:{padding:"12px 20px",borderTop:"1px solid "+((0,V.BV)().dark?"#333":"#f0f0f0"),display:"flex",alignItems:"center",gap:16},children:[(0,P.jsxs)(re.A,{size:4,children:[(0,P.jsx)(ee.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,V.BV)().dark?"#555":"#ddd"),background:(0,V.BV)().dark?"#2a2a2a":"#fff"},children:"\u2191"}),(0,P.jsx)(ee.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,V.BV)().dark?"#555":"#ddd"),background:(0,V.BV)().dark?"#2a2a2a":"#fff"},children:"\u2193"})]}),(0,P.jsx)(re.A,{size:4,children:(0,P.jsx)(ee.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,V.BV)().dark?"#555":"#ddd"),background:(0,V.BV)().dark?"#2a2a2a":"#fff"},children:"\u21b5"})}),(0,P.jsxs)(re.A,{size:4,children:[(0,P.jsx)(ee.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,V.BV)().dark?"#555":"#ddd"),background:(0,V.BV)().dark?"#2a2a2a":"#fff"},children:"Esc"}),(0,P.jsx)("span",{style:{fontSize:12,color:(0,V.BV)().dark?"#888":"#999"},children:(0,m.jY)().close})]})]})]})})]})},{Header:le,Content:de,Sider:se}=o.A,ce=e=>{let{offline:t,children:r,loading:u,fullScreen:h,basicUserInfo:x,syncStaticSite:f,systemNotification:b}=e;const y=(0,M.A)(),k=(0,L.DP)(),w="sliderOpen",j=e=>{if(window.innerWidth<576){const e=(0,R.Pn)(w);return void 0===e||null===e||e}return!0===e.xs},[v,A]=(0,g.useState)(window.innerWidth<576),B=j(y),[S,$]=(0,g.useState)(B);if((0,g.useEffect)(()=>{$(j(y)),A(!0===y.xs)},[y]),void 0===y.xs)return(0,P.jsx)(P.Fragment,{});const T=()=>`calc(100vh - ${F()}px)`,F=()=>(0,V.BV)().compactMode?54:64,E=()=>(0,V.BV)().compactMode?64:88;return(0,P.jsx)(Y.A,{children:(0,P.jsxs)(_,{compactMode:(0,V.BV)().compactMode,colorPrimary:(0,V.BV)().colorPrimary,children:[b&&b.length>0&&(0,P.jsx)(d.A,{showIcon:!0,banner:!0,type:"info",title:b,style:{position:"fixed",zIndex:k.zIndexPopupBase,top:38,borderRadius:k.borderRadius,left:"50%",transform:"translateX(-50%)",width:"fit-content"}}),(0,P.jsxs)(le,{style:{height:F(),display:h?"none":"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:(0,V.BV)().dark?"rgba(26, 26, 26, 0.85)":(0,V.BV)().colorPrimary+"10",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",paddingLeft:0},children:[(()=>{const e=(0,P.jsx)("a",{href:(0,m.jY)().homeUrl+"?spm=admin&buildId="+(0,m.jY)().buildId,className:"ant-menu-item",target:"_blank",title:(0,m.jY)().websiteTitle,style:{height:F(),display:"flex",alignItems:"center",justifyContent:"center",width:E()},rel:"noopener noreferrer",children:(0,P.jsx)(n.A,{style:{fontSize:(0,V.BV)().compactMode?22:28,color:(0,V.BV)().dark?"rgb(255 255 255 / 65%)":"#333333"}})});return v?(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start"},children:[(0,P.jsx)("div",{style:{textAlign:"center",width:E(),height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,P.jsx)(l.Ay,{type:"primary",onClick:()=>{const e=!S;(0,R.ls)(w,e),$(e)},children:S?(0,P.jsx)(a.A,{}):(0,P.jsx)(i.A,{})})}),e]}):e})(),t&&(0,P.jsx)("span",{style:{display:"inline-block",textAlign:"center",fontSize:20,paddingLeft:24,userSelect:"none",color:(0,V.BV)().colorPrimary,fontWeight:600,textShadow:`0 2px 8px ${(0,V.BV)().colorPrimary}40`},children:(0,m.jY)()["admin.offline.desc"]}),(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,P.jsx)(oe,{}),(0,P.jsx)(C,{offline:t,data:x})]})]}),(0,P.jsxs)(s.A,{style:{position:"relative",minHeight:T()},children:[(0,P.jsx)(se,{width:E(),style:{opacity:h||S?0:1,position:"absolute",zIndex:1e3,top:0,left:S?`-${E()}px`:"0",height:"100%",transform:h||S?"translateX(-100%)":"translateX(0)",backgroundColor:(0,V.BV)().dark?"rgba(26, 26, 26, 0.95)":"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)"},children:(0,P.jsx)(z.A,{})}),!S&&v&&(0,P.jsx)("div",{onClick:()=>{(0,R.ls)(w,!0),$(!0)},style:{position:"fixed",top:F(),left:0,width:"100vw",height:`calc(100vh - ${F()}px)`,backgroundColor:"rgba(0,0,0,0.32)",zIndex:999,transition:"opacity 0.2s cubic-bezier(0.2, 0, 0, 1)"}}),(0,P.jsx)(c.A,{style:{flex:1,width:"100%",minHeight:h?0:1,marginLeft:v||h?0:E(),transition:"margin-left 0.2s cubic-bezier(0.2, 0, 0, 1)"},children:(0,P.jsx)(o.A,{style:{minHeight:T(),overflow:h?"hidden":"auto"},children:(0,P.jsxs)(de,{style:{paddingRight:h?0:12,paddingLeft:h?0:12,paddingBottom:h?0:12},children:[u&&(0,P.jsx)(I.A,{}),r]})})})]}),(0,P.jsxs)(p.A.Group,{children:[f&&(0,P.jsx)(D.default,{data:{synced:!1},offlineData:!1,offline:t}),(0,P.jsx)(p.A.BackTop,{})]})]})})}}}]);