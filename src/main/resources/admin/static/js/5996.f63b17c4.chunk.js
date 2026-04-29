"use strict";(self.webpackChunkadmin_web_frontend=self.webpackChunkadmin_web_frontend||[]).push([[5996],{45996:(e,t,a)=>{a.r(t),a.d(t,{default:()=>me});var n=a(6375),i=a(29205),r=a(96185),o=a(68832),l=a(3646),s=a(48538),d=a(9039),c=a(68046),p=a(87094),m=a(41988),g=a(62215),u=a(78816),b=a(9950),h=a(79378),x=a(27153),f=a(31170),y=a(73965),j=a(73022),w=a(65455),k=a(46782),v=a(42074),A=a(9636),Y=a(1832),B=a(23072),$=a(37596),P=a(46666),S=a(44414);const{Text:V}=l.A,z=e=>{var t;let{data:a,offline:n}=e;const[i,r]=w.A.useModal(),o=(e=>{var t;let r=[{key:"1",label:(0,S.jsxs)(v.N_,{style:{whiteSpace:"nowrap"},to:(0,u.dW)("/user"),onClick:e=>(0,$.hx)(e,i),children:[(0,S.jsx)(h.A,{}),(0,S.jsx)(V,{style:{paddingLeft:"5px",paddingRight:16},children:e["admin.user.info"]})]})},{key:"2",label:(0,S.jsxs)(v.N_,{to:(0,u.dW)("/user-update-password"),onClick:e=>(0,$.hx)(e,i),children:[(0,S.jsx)(x.A,{}),(0,S.jsx)(V,{style:{paddingLeft:"5px",paddingRight:16},children:e["admin.changePwd"]})]})},{key:"-",label:(0,S.jsx)(B.A,{style:{marginTop:"5px",marginBottom:"5px",userSelect:"none",cursor:"none"}})}];return n||r.push({key:"3",label:(0,S.jsxs)("a",{href:(0,u.XW)()+"admin/logout"+((0,u.M$)()?"?sp=true":""),onClick:e=>(0,$.hx)(e,i),children:[(0,S.jsx)(f.A,{}),(0,S.jsx)(V,{style:{paddingLeft:"5px",paddingRight:16},children:e["admin.user.logout"]})]})}),null!==(t=a.lastVersion)&&void 0!==t&&t.upgrade&&(r=[{key:"99",label:(0,S.jsx)(v.N_,{to:(0,u.dW)("/upgrade"),onClick:e=>(0,$.hx)(e,i),children:(0,S.jsxs)(k.A,{dot:!0,styles:{root:{whiteSpace:"nowrap"}},children:[(0,S.jsx)(y.A,{}),(0,S.jsxs)(V,{style:{paddingLeft:"6px"},children:[e.newVersion," - (",a.lastVersion.version.version,"#",a.lastVersion.version.type,")"]})]})})},...r]),r})((0,u.jY)()),l=()=>(0,P.BV)().compactMode?32:40;return(0,S.jsxs)(S.Fragment,{children:[r,(0,S.jsx)(A.A,{menu:{items:o},placement:"bottom",children:(0,S.jsxs)("div",{style:{color:(0,P.BV)().dark?"#ffffff":"#333333",marginRight:16,height:50,display:"flex",alignItems:"center"},children:[(0,S.jsx)(Y.A,{preview:!1,fallback:u.Ay.getFillBackImg(),className:"userAvatarImg",src:a.header,style:{lineHeight:l(),width:l(),height:l()}}),(0,S.jsx)(k.A,{dot:null===(t=a.lastVersion)||void 0===t?void 0:t.upgrade,children:(0,S.jsx)(V,{style:{color:(0,P.BV)().dark?"#ffffff":"#333333",paddingLeft:8},children:a.userName})}),(0,S.jsx)(j.A,{})]})})]})};var C=a(2383),I=a(44669),W=a(31743);const T=a(24937).Ay.div`
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
            background: ${e=>(0,C.b)(e.colorPrimary,.08)} !important;
        }
    }

    .ant-menu-sub .ant-menu-item-selected {
        background: ${e=>(0,C.b)(e.colorPrimary,.16)} !important;
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
        background: ${e=>(0,C.b)(e.colorPrimary,.08)} !important; /* MD3 Hover state layer */
        color: ${e=>e.colorPrimary} !important;
        box-shadow: none;

        .anticon {
            filter: drop-shadow(0 1px 2px ${e=>e.colorPrimary}20);
        }
    }

    .ant-menu-item-selected {
        background: ${e=>(0,C.b)(e.colorPrimary,.12)} !important; /* MD3 Focus/Active state layer */
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

    .header-title-block {
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
    }

    .header-title-eyebrow,
    .header-title-main {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .header-title-eyebrow {
        font-size: 11px;
        line-height: 1.1;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .header-title-main {
        font-size: 16px;
        line-height: 1.2;
        font-weight: 600;
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
            background: ${e=>(0,C.b)(e.colorPrimary,.3)} !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .dark &:hover .ant-float-btn-body {
            background: ${e=>(0,C.b)(e.colorPrimary,.4)} !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4);
        }
    }

    .ant-float-btn-group {
        border-radius: 50px !important;
        .ant-float-btn-body {
            border-radius: 50px !important;
        }
    }

    .sidebar-shell {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .sidebar-brand {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: ${e=>e.textColor};
        margin: 10px 10px 8px;
        border-radius: 16px;
        width: calc(100% - 20px);
        min-height: ${e=>e.compactMode?50:56}px;
        transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .sidebar-brand:hover {
        background: rgba(0, 0, 0, 0.03);
    }

    .dark .sidebar-brand:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .sidebar-brand-collapsed {
        justify-content: center;
        padding: 0;
    }

    .sidebar-brand-expanded {
        justify-content: flex-start;
        gap: 9px;
    }

    .sidebar-brand-expanded .sidebar-brand-mark {
        margin-left: 12px;
    }

    .sidebar-brand-mark {
        width: 34px;
        height: 34px;
        border-radius: 11px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: ${e=>(0,C.b)(e.colorPrimary,.12)};
        color: ${e=>e.colorPrimary};
        font-size: 18px;
        flex-shrink: 0;
    }

    .dark .sidebar-brand-mark {
        background: ${e=>(0,C.b)(e.colorPrimary,.2)};
    }

    .sidebar-brand-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding-right: 14px;
    }

    .sidebar-brand-title,
    .sidebar-brand-subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .sidebar-brand-title {
        font-size: 13px;
        line-height: 1.15;
        font-weight: 600;
        color: ${e=>e.textColor};
    }

    .sidebar-brand-subtitle {
        font-size: 10px;
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: ${e=>e.textTertiaryColor};
    }

    .sidebar-rail.ant-menu {
        text-align: center;
        padding: 8px 0 12px;
    }

    .sidebar-rail.ant-menu .ant-menu-item,
    .sidebar-rail.ant-menu .ant-menu-item-selected {
        margin: 0 10px 6px;
        width: calc(100% - 20px);
        height: ${e=>e.compactMode?60:66}px;
        border-radius: 18px;
    }

    .sidebar-rail.ant-menu .ant-menu-title-content > a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        height: 100%;
    }

    .sidebar-rail.ant-menu .menu-title {
        font-size: 11px;
        line-height: 1.1;
        font-weight: 500;
        margin-top: 0;
        color: ${e=>e.textSecondaryColor};
    }

    .sidebar-rail.ant-menu .ant-menu-item .anticon {
        font-size: ${e=>e.compactMode?22:24}px;
    }

    .sidebar-rail.ant-menu .ant-menu-title-content > a {
        color: ${e=>e.textColor} !important;
    }

    .sidebar-rail.ant-menu .ant-menu-item-selected .menu-title {
        color: ${e=>e.colorPrimary};
    }

    .sidebar-rail.ant-menu .ant-menu-item-selected > .ant-menu-title-content > a {
        color: ${e=>e.colorPrimary};
    }

    .sidebar-rail.ant-menu .ant-menu-item-selected .anticon {
        color: ${e=>e.colorPrimary};
    }

    .sidebar-panel.ant-menu {
        text-align: left;
        padding: 4px 10px 24px;
    }

    .sidebar-panel.ant-menu .ant-menu-item-group {
        margin-bottom: 16px;
    }

    .sidebar-panel.ant-menu .ant-menu-item-group-title {
        padding: 0 12px 8px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: ${e=>e.textTertiaryColor};
    }

    .sidebar-panel.ant-menu .ant-menu-item {
        box-sizing: border-box;
        margin: 0 6px 4px;
        width: auto;
        height: 46px;
        border-radius: 14px;
    }

    .sidebar-panel.ant-menu .ant-menu-title-content > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        height: 100%;
        padding: 0 14px;
    }

    .sidebar-panel.ant-menu .menu-title {
        margin-top: 0;
        font-size: 14px;
        line-height: 1.2;
        font-weight: 500;
        color: ${e=>e.textSecondaryColor} !important;
    }

    .sidebar-panel.ant-menu .ant-menu-title-content > a {
        color: ${e=>e.textColor} !important;
    }

    .sidebar-rail.ant-menu .ant-menu-item,
    .sidebar-panel.ant-menu .ant-menu-item {
        color: ${e=>e.textColor};
    }

    .sidebar-panel.ant-menu .ant-menu-item .anticon {
        font-size: 19px;
    }

    .sidebar-panel.ant-menu .ant-menu-item-selected .menu-title {
        color: ${e=>e.colorPrimary};
    }

    .sidebar-panel.ant-menu .ant-menu-item-selected > .ant-menu-title-content > a {
        color: ${e=>e.colorPrimary};
    }

    .sidebar-panel.ant-menu .ant-menu-item-selected .anticon {
        color: ${e=>e.colorPrimary};
    }

    .sidebar-rail.ant-menu .ant-menu-item::before,
    .sidebar-panel.ant-menu .ant-menu-item::before {
        display: none;
    }

    .sidebar-rail.ant-menu .ant-menu-item:hover,
    .sidebar-panel.ant-menu .ant-menu-item:hover {
        box-shadow: none;
    }

    .sidebar-rail.ant-menu .ant-menu-item-selected,
    .sidebar-panel.ant-menu .ant-menu-item-selected {
        background: ${e=>(0,C.b)(e.colorPrimary,.12)} !important;
    }

    .sidebar-rail.ant-menu .ant-menu-item:hover {
        background: rgba(15, 23, 42, 0.05) !important;
    }

    .sidebar-panel.ant-menu .ant-menu-item:hover {
        background: rgba(15, 23, 42, 0.045) !important;
    }

    .dark .sidebar-rail.ant-menu .ant-menu-item:hover,
    .dark .sidebar-panel.ant-menu .ant-menu-item:hover {
        background: rgba(255, 255, 255, 0.06) !important;
    }
`;var M=a(16661),R=a(85221),_=a(87085),D=a(97211),F=a(58203),L=a(90582),N=a(50198),E=a(88349),H=a(22569),O=a(9774),K=a(5992),U=a(26142),X=a(66276),J=a(95770),q=a(43078),G=a(82278),Z=a(52786),Q=a(52378),ee=a(13777),te=a(86699),ae=a(71420),ne=a(75220),ie=a(28429),re=a(34647);const{useBreakpoint:oe}=Q.Ay,le=e=>{let{compact:t=!1}=e;const[a,n]=(0,b.useState)(!1),[i,r]=(0,b.useState)(""),[o,l]=(0,b.useState)(0),[s,d]=(0,b.useState)([]),[p,m]=(0,b.useState)(!1),g=(0,D.DP)(),f=(0,ie.Zp)(),y=(0,b.useRef)(null),j=(0,re.cz)(),k=[{id:"dashboard",title:(0,u.jY)().dashboard,path:"/",icon:(0,S.jsx)(F.A,{}),keywords:["dashboard","home","index","\u4e3b\u9875","\u9996\u9875","\u4eea\u8868\u76d8"],type:"route"},{id:"write",title:(0,u.jY)().writeArticle,path:"/article-edit",icon:(0,S.jsx)(L.A,{}),keywords:["write","post","new","\u5199\u6587\u7ae0","\u65b0\u5efa","\u53d1\u5e03"],type:"route"},{id:"article",title:(0,u.jY)().blogManage,path:"/article",icon:(0,S.jsx)(N.A,{}),keywords:["article","list","\u6587\u7ae0","\u5217\u8868","\u7ba1\u7406"],type:"route"},{id:"article_draft",title:(0,u.jY)().articleDraft,path:"/article?status=draft",icon:(0,S.jsx)(E.A,{}),keywords:["draft","article","\u8349\u7a3f","\u6587\u7ae0","caogao"],type:"route"},{id:"category",title:(0,u.jY)()["admin.type.manage"],path:"/article-type",icon:(0,S.jsx)(H.A,{}),keywords:["category","type","\u5206\u7c7b","\u7c7b\u522b"],type:"route"},{id:"comment",title:(0,u.jY)()["admin.comment.manage"],path:"/comment",icon:(0,S.jsx)(O.A,{}),keywords:["comment","reply","\u8bc4\u8bba","\u56de\u590d","\u7559\u8a00"],type:"route"},{id:"nav",title:(0,u.jY)()["admin.nav.manage"],path:"/nav",icon:(0,S.jsx)(K.A,{}),keywords:["nav","menu","\u5bfc\u822a","\u83dc\u5355"],type:"route"},{id:"link",title:(0,u.jY)()["admin.link.manage"],path:"/link",icon:(0,S.jsx)(U.A,{}),keywords:["link","friend","\u53cb\u94fe","\u94fe\u63a5"],type:"route"},{id:"website_base",title:(0,u.jY)()["admin.basic.manage"],path:"/website/admin",icon:(0,S.jsx)(X.A,{}),keywords:["setting","base","\u57fa\u672c","\u8bbe\u7f6e","\u914d\u7f6e"],type:"route"},{id:"website_blog",title:(0,u.jY)()["admin.blog.manage"],path:"/website/blog",icon:(0,S.jsx)(X.A,{}),keywords:["blog","setting","\u535a\u5ba2","\u8bbe\u7f6e"],type:"route"},{id:"website_seo",title:(0,u.jY)()["admin.other.manage"],path:"/website/other",icon:(0,S.jsx)(X.A,{}),keywords:["seo","other","setting","\u4f18\u5316"],type:"route"},{id:"website_ai",title:(0,u.jY)()["admin.ai.manage"],path:"/website/ai",icon:(0,S.jsx)(X.A,{}),keywords:["ai","gemini","chatgpt","\u4eba\u5de5\u667a\u80fd"],type:"route"},{id:"theme_center",title:(0,u.jY)().templateCenter,path:"/template-center",icon:(0,S.jsx)(X.A,{}),keywords:["theme","template","\u4e3b\u9898","\u6a21\u677f","\u5916\u89c2"],type:"route"},{id:"theme_setting",title:(0,u.jY)()["admin.template.manage"],path:"/website/template",icon:(0,S.jsx)(X.A,{}),keywords:["theme","setting","\u4e3b\u9898","\u8bbe\u7f6e"],type:"route"},{id:"system",title:(0,u.jY)().systemInfo,path:"/system",icon:(0,S.jsx)(F.A,{}),keywords:["system","info","\u7cfb\u7edf","\u4fe1\u606f","\u73af\u5883"],type:"route"},{id:"user",title:(0,u.jY)()["admin.user.info"],path:"/user",icon:(0,S.jsx)(h.A,{}),keywords:["user","profile","\u4e2a\u4eba","\u4fe1\u606f","\u7528\u6237","\u5934\u50cf"],type:"route"},{id:"pwd",title:(0,u.jY)()["admin.changePwd"],path:"/user-update-password",icon:(0,S.jsx)(x.A,{}),keywords:["password","update","\u5bc6\u7801","\u4fee\u6539","\u5b89\u5168"],type:"route"},{id:"backup",title:(0,u.jY)().backupFiles,path:"/plugin?page=backup-sql-file/files",icon:(0,S.jsx)(J.A,{}),keywords:["backup","restore","sql","\u5907\u4efd","\u6062\u590d","\u6570\u636e\u5e93"],type:"route"},{id:"plugin",title:(0,u.jY)()["admin.plugin.manage"],path:"/plugin",icon:(0,S.jsx)(q.A,{}),keywords:["plugin","\u63d2\u4ef6","chajian"],type:"route"},{id:"version",title:(0,u.jY)()["admin.version"],path:"/website/version",icon:(0,S.jsx)(G.A,{}),keywords:["version","update","\u7248\u672c","\u66f4\u65b0","banben","gengxin"],type:"route"}];(0,b.useEffect)(()=>{const e=e=>{(e.metaKey||e.ctrlKey)&&"k"===e.key&&(e.preventDefault(),n(!0))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]);const[v,A]=(0,b.useState)([]);(0,b.useEffect)(()=>{if(a){r(""),d([]),l(0);try{const e=JSON.parse(localStorage.getItem("zrlog_spotlight_recent")||"[]").map(e=>{let t=(0,S.jsx)(Z.A,{});if("article"===e.type)t=(0,S.jsx)(L.A,{});else{const a=k.find(t=>t.id===e.id);a&&(t=a.icon)}return{...e,icon:t,isRecent:!0}});A(e)}catch(e){A([])}setTimeout(()=>{var e;return null===(e=y.current)||void 0===e?void 0:e.focus()},100)}},[a]),(0,b.useEffect)(()=>{if(!i.trim())return d([]),void l(0);const e=setTimeout(async()=>{m(!0);try{const{data:e}=await j.get("/api/admin/article",{params:{key:i,page:1,size:5}});if(e&&e.data&&e.data.rows){const t=e.data.rows.map(e=>({id:`article-${e.id}`,title:e.title,subTitle:e.typeName,path:`/article-edit?id=${e.id}`,icon:(0,S.jsx)(L.A,{}),keywords:[],type:"article"}));d(t)}}catch(e){console.error("Failed to fetch articles",e)}finally{m(!1)}},300);return()=>clearTimeout(e)},[i]);let Y=[];if(""===i.trim()){const e=new Set(v.map(e=>e.id)),t=k.filter(t=>!e.has(t.id));Y=[...v,...t]}else{const e=k.filter(e=>e.title.toLowerCase().includes(i.toLowerCase())||e.keywords.some(e=>e.toLowerCase().includes(i.toLowerCase())));Y=[...e,...s]}const B=e=>{try{const t=JSON.parse(localStorage.getItem("zrlog_spotlight_recent")||"[]"),a=[{id:e.id,title:e.title,subTitle:e.subTitle,path:e.path,type:e.type},...t.filter(t=>t.id!==e.id)].slice(0,5);localStorage.setItem("zrlog_spotlight_recent",JSON.stringify(a))}catch(t){console.error(t)}f((0,u.dW)(e.path)),n(!1)};(0,b.useEffect)(()=>{if(a){const e=document.getElementById(`spotlight-item-${o}`);e&&e.scrollIntoView({block:"nearest"})}},[o,a]);const $="undefined"!==typeof window&&/macintosh|mac os x/i.test(navigator.userAgent),V=oe().xs;return(0,S.jsxs)(S.Fragment,{children:[V?(0,S.jsx)("div",{onClick:()=>n(!0),style:{display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:"50%",cursor:"pointer",marginRight:12,color:(0,P.BV)().dark?"#aaa":"#555"},children:(0,S.jsx)(Z.A,{style:{fontSize:18}})}):(0,S.jsx)(ee.A,{onClick:()=>n(!0),onMouseDown:e=>e.preventDefault(),prefix:(0,S.jsx)(Z.A,{style:{color:(0,P.BV)().dark?"#888":"#999"}}),suffix:(0,S.jsx)("div",{style:{fontSize:12,border:"1px solid "+((0,P.BV)().dark?"#444":"#ddd"),borderRadius:999,padding:"0 4px",backgroundColor:(0,P.BV)().dark?"rgba(255,255,255,0.05)":"#fafafa",color:(0,P.BV)().dark?"#888":"#999",lineHeight:"18px",userSelect:"none"},children:$?"\u2318 K":"Ctrl K"}),placeholder:(0,u.jY)().search,readOnly:!0,style:{width:t?180:220,marginRight:t?0:16,cursor:"pointer",caretColor:"transparent",borderRadius:999}}),(0,S.jsx)(w.A,{open:a,onCancel:()=>n(!1),footer:null,closable:!1,width:600,style:{top:V?20:100},styles:{mask:{backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",backgroundColor:(0,P.BV)().dark?"rgba(0, 0, 0, 0.45)":"rgba(255, 255, 255, 0.45)"},body:{padding:0}},children:(0,S.jsxs)("div",{style:{padding:0,overflow:"hidden",backgroundColor:(0,P.BV)().dark?"#1f1f1f":"#ffffff",borderRadius:g.borderRadiusLG},children:[(0,S.jsx)("div",{style:{padding:"16px 20px",borderBottom:"1px solid "+((0,P.BV)().dark?"#333":"#f0f0f0")},children:(0,S.jsx)(ee.A,{ref:y,variant:"borderless",prefix:(0,S.jsx)(Z.A,{style:{fontSize:20,color:(0,P.BV)().colorPrimary,marginRight:8}}),placeholder:(0,u.jY)().searchTip,value:i,onChange:e=>r(e.target.value),onKeyDown:e=>{"ArrowDown"===e.key?(e.preventDefault(),l(e=>e<Y.length-1?e+1:e)):"ArrowUp"===e.key?(e.preventDefault(),l(e=>e>0?e-1:e)):"Enter"===e.key?(e.preventDefault(),Y.length>0&&Y[o]&&B(Y[o])):"Escape"===e.key&&(e.preventDefault(),n(!1))},style:{fontSize:18,padding:0}})}),(0,S.jsxs)("div",{style:{maxHeight:V?"70vh":"60vh",overflowY:"auto",padding:"8px 0"},children:[0!==Y.length||p?(0,S.jsx)(te.A,{dataSource:Y,renderItem:(e,t)=>(0,S.jsx)(te.A.Item,{id:`spotlight-item-${t}`,onClick:()=>B(e),onMouseEnter:()=>l(t),style:{padding:"12px 16px",margin:"4px 12px",cursor:"pointer",borderBottom:"none",borderRadius:g.borderRadius,backgroundColor:t===o?(0,P.BV)().dark?"rgba(255,255,255,0.08)":`${(0,P.BV)().colorPrimary}15`:"transparent",transition:"background-color 0.1s"},children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",width:"100%"},children:[(0,S.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,fontSize:20,color:t===o?(0,P.BV)().colorPrimary:(0,P.BV)().dark?"#aaa":"#555",marginRight:12},children:e.icon}),(0,S.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",minWidth:0},children:[(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,overflow:"hidden"},children:[(0,S.jsx)("span",{style:{fontSize:15,fontWeight:t===o?600:400,color:t===o?(0,P.BV)().colorPrimary:(0,P.BV)().dark?"#eee":"#333",lineHeight:1.4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},dangerouslySetInnerHTML:{__html:e.title}}),e.isRecent&&(0,S.jsx)(c.A,{bordered:!1,color:"default",style:{margin:0,padding:"0 6px",lineHeight:"20px",fontSize:12,flexShrink:0},children:(0,u.jY)().recent}),"article"===e.type&&(0,S.jsx)(c.A,{bordered:!1,color:"blue",style:{margin:0,padding:"0 6px",lineHeight:"20px",fontSize:12,flexShrink:0},children:(0,u.jY)().article})]}),e.subTitle&&(0,S.jsx)("div",{style:{fontSize:12,color:(0,P.BV)().dark?"#888":"#aaa",marginTop:2,lineHeight:1.2},children:e.subTitle})]}),t===o&&(0,S.jsxs)("div",{style:{color:t===o?(0,P.BV)().colorPrimary:(0,P.BV)().dark?"#888":"#999",fontSize:12,marginLeft:8,opacity:.8},children:["\u21b5 ",(0,u.jY)().pleaseChoose]})]})})}):(0,S.jsx)("div",{style:{padding:32,textAlign:"center",color:(0,P.BV)().dark?"#888":"#999"},children:(0,u.jY)().notFound}),p&&(0,S.jsx)("div",{style:{padding:16,textAlign:"center"},children:(0,S.jsx)(ae.A,{size:"small"})})]}),!V&&(0,S.jsxs)("div",{style:{padding:"12px 20px",borderTop:"1px solid "+((0,P.BV)().dark?"#333":"#f0f0f0"),display:"flex",alignItems:"center",gap:16},children:[(0,S.jsxs)(ne.A,{size:4,children:[(0,S.jsx)(c.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,P.BV)().dark?"#555":"#ddd"),background:(0,P.BV)().dark?"#2a2a2a":"#fff"},children:"\u2191"}),(0,S.jsx)(c.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,P.BV)().dark?"#555":"#ddd"),background:(0,P.BV)().dark?"#2a2a2a":"#fff"},children:"\u2193"})]}),(0,S.jsx)(ne.A,{size:4,children:(0,S.jsx)(c.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,P.BV)().dark?"#555":"#ddd"),background:(0,P.BV)().dark?"#2a2a2a":"#fff"},children:"\u21b5"})}),(0,S.jsxs)(ne.A,{size:4,children:[(0,S.jsx)(c.A,{style:{margin:0,padding:"0 4px",border:"1px solid "+((0,P.BV)().dark?"#555":"#ddd"),background:(0,P.BV)().dark?"#2a2a2a":"#fff"},children:"Esc"}),(0,S.jsx)("span",{style:{fontSize:12,color:(0,P.BV)().dark?"#888":"#999"},children:(0,u.jY)().close})]})]})]})})]})},{Header:se,Content:de,Sider:ce}=o.A,{Text:pe}=l.A,me=e=>{let{offline:t,children:a,loading:l,fullScreen:h,basicUserInfo:x,syncStaticSite:f,systemNotification:y}=e;const j=(0,M.A)(),w=(0,D.DP)(),k=(0,ie.zy)(),v="sliderOpen",A="sliderPanelOpen",Y=e=>{if(window.innerWidth<576){const e=(0,R.Pn)(v);return void 0===e||null===e||e}return!0===e.xs},B=Y(j),[$,V]=(0,b.useState)(B),[F,L]=(0,b.useState)(!0===(0,R.Pn)(A));if((0,b.useEffect)(()=>{V(Y(j))},[j]),void 0===j.xs)return(0,S.jsx)(S.Fragment,{});const N=()=>`calc(100vh - ${E()}px)`,E=()=>(0,P.BV)().compactMode?54:64,H=()=>(0,P.BV)().compactMode?72:80,O=()=>(0,P.BV)().compactMode?228:248,K=!0===j.xs,U=F?O():H(),X=()=>{if(K){const e=!$;return(0,R.ls)(v,e),void V(e)}const e=!F;(0,R.ls)(A,e),L(e)},J=(()=>{const e=k.pathname.split(".")[0];return""===e||"/"===e||"/index"===e?{title:(0,u.jY)().dashboard,subtitle:(0,u.jY)()["admin.management"]}:e.startsWith("/article-edit")?{title:(0,u.jY)()["admin.log.edit"],subtitle:(0,u.jY)().blogManage}:e.startsWith("/article")?{title:(0,u.jY)().blogManage,subtitle:(0,u.jY)()["admin.management"]}:e.startsWith("/article-type")?{title:(0,u.jY)()["admin.type.manage"],subtitle:(0,u.jY)().blogManage}:e.startsWith("/nav")?{title:(0,u.jY)()["admin.nav.manage"],subtitle:(0,u.jY)()["admin.management"]}:e.startsWith("/link")?{title:(0,u.jY)()["admin.link.manage"],subtitle:(0,u.jY)()["admin.management"]}:e.startsWith("/comment")?{title:(0,u.jY)()["admin.comment.manage"],subtitle:(0,u.jY)()["admin.management"]}:e.startsWith("/plugin")?{title:(0,u.jY)()["admin.plugin.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/template-center")?{title:(0,u.jY)().templateCenter,subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/system")?{title:(0,u.jY)().systemInfo,subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/user-update-password")?{title:(0,u.jY)()["admin.changePwd"],subtitle:(0,u.jY)()["admin.user.info"]}:e.startsWith("/user")?{title:(0,u.jY)()["admin.user.info"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/version")?{title:(0,u.jY)()["admin.version"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/upgrade")?{title:(0,u.jY)().upgradeWizard,subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/template")?{title:(0,u.jY)()["admin.template.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/upgrade")?{title:(0,u.jY)()["admin.upgrade.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/ai")?{title:(0,u.jY)()["admin.ai.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/other")?{title:(0,u.jY)()["admin.other.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/blog")?{title:(0,u.jY)()["admin.blog.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website/admin")?{title:(0,u.jY)()["admin.admin.manage"],subtitle:(0,u.jY)()["admin.setting"]}:e.startsWith("/website")?{title:(0,u.jY)()["admin.setting"],subtitle:(0,u.jY)()["admin.management"]}:{title:(0,u.jY)()["admin.management"],subtitle:(0,u.jY)().websiteTitle}})(),q=e=>(0,S.jsxs)("a",{href:(0,u.jY)().homeUrl+"?spm=admin&buildId="+(0,u.jY)().buildId,className:"sidebar-brand "+(e?"sidebar-brand-expanded":"sidebar-brand-collapsed"),target:"_blank",title:(0,u.jY)().websiteTitle,rel:"noopener noreferrer",children:[(0,S.jsx)("span",{className:"sidebar-brand-mark",children:(0,S.jsx)(n.A,{})}),e&&(0,S.jsx)("span",{className:"sidebar-brand-copy",children:(0,S.jsx)("span",{className:"sidebar-brand-title",children:(0,u.jY)().websiteTitle})})]});return(0,S.jsx)(W.A,{children:(0,S.jsxs)(T,{compactMode:(0,P.BV)().compactMode,colorPrimary:(0,P.BV)().colorPrimary,textColor:w.colorText,textSecondaryColor:w.colorTextSecondary,textTertiaryColor:w.colorTextTertiary,children:[y&&y.length>0&&(0,S.jsx)(d.A,{showIcon:!0,banner:!0,type:"info",title:y,style:{position:"fixed",zIndex:w.zIndexPopupBase,top:38,borderRadius:w.borderRadius,left:"50%",transform:"translateX(-50%)",width:"fit-content"}}),(0,S.jsxs)(se,{style:{height:E(),display:h?"none":"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:(0,P.BV)().dark?"rgba(18, 18, 18, 0.82)":"rgba(255, 255, 255, 0.82)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",paddingLeft:0,boxSizing:"border-box",borderBottom:(0,P.BV)().dark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(15,23,42,0.06)"},children:[(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",minWidth:0},children:[(0,S.jsx)("div",{style:{textAlign:"center",width:H(),height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,S.jsx)(s.Ay,{type:"text",shape:"circle",onClick:X,icon:K?$?(0,S.jsx)(i.A,{}):(0,S.jsx)(r.A,{}):F?(0,S.jsx)(r.A,{}):(0,S.jsx)(i.A,{}),style:{width:44,height:44,color:(0,P.BV)().dark?"rgba(255,255,255,0.88)":"#0f0f0f",background:"transparent",boxShadow:"none",fontSize:20}})}),(0,S.jsxs)("div",{className:"header-title-block",children:[J.subtitle?(0,S.jsx)(pe,{type:"secondary",className:"header-title-eyebrow",children:J.subtitle}):null,(0,S.jsx)(pe,{strong:!0,className:"header-title-main",ellipsis:!0,children:J.title})]})]}),(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12,minWidth:0},children:[(0,S.jsx)(le,{compact:!0}),t&&(0,S.jsx)(c.A,{bordered:!1,style:{marginInlineEnd:0,borderRadius:999,paddingInline:10,height:30,lineHeight:"30px",fontSize:12,fontWeight:600,backgroundColor:(0,P.BV)().dark?"rgba(255, 120, 117, 0.16)":"rgba(255, 77, 79, 0.10)",color:(0,P.BV)().dark?"#ffb3b0":"#cf1322"},children:(0,u.jY)()["admin.offline.short"]}),(0,S.jsx)(z,{offline:t,data:x})]})]}),(0,S.jsxs)(p.A,{style:{position:"relative",minHeight:N()},children:[!K&&!h&&(0,S.jsx)(ce,{width:U,style:{position:"absolute",zIndex:1e3,top:0,left:0,height:"100%",backgroundColor:(0,P.BV)().dark?"rgba(26, 26, 26, 0.86)":"rgba(255, 255, 255, 0.88)",backdropFilter:"blur(18px) saturate(160%)",WebkitBackdropFilter:"blur(18px) saturate(160%)",borderRight:(0,P.BV)().dark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(15,23,42,0.08)",overflow:"hidden",transition:"width 0.22s cubic-bezier(0.2, 0, 0, 1)",boxShadow:F?(0,P.BV)().dark?"18px 0 36px rgba(0,0,0,0.34)":"18px 0 36px rgba(15,23,42,0.08)":"none"},children:(0,S.jsxs)("div",{className:"sidebar-shell",children:[q(F),(0,S.jsx)(C.A,{expanded:F})]})}),K&&(0,S.jsx)(ce,{width:O(),style:{opacity:h||$?0:1,position:"absolute",zIndex:1001,top:0,left:$?`-${O()}px`:"0",height:"100%",transform:h||$?"translateX(-100%)":"translateX(0)",backgroundColor:(0,P.BV)().dark?"rgba(26, 26, 26, 0.95)":"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",borderRight:(0,P.BV)().dark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(15,23,42,0.08)"},children:(0,S.jsxs)("div",{className:"sidebar-shell",children:[q(!0),(0,S.jsx)(C.A,{expanded:!0})]})}),(K&&!$||!K&&F)&&!h&&(0,S.jsx)("div",{onClick:()=>{K?((0,R.ls)(v,!0),V(!0)):((0,R.ls)(A,!1),L(!1))},style:{position:"fixed",top:E(),left:0,width:"100vw",height:`calc(100vh - ${E()}px)`,backgroundColor:(0,P.BV)().dark?"rgba(8,12,20,0.22)":"rgba(15,23,42,0.10)",zIndex:999,transition:"opacity 0.2s cubic-bezier(0.2, 0, 0, 1)"}}),(0,S.jsx)(m.A,{style:{flex:1,width:"100%",minHeight:h?0:1,marginLeft:h||K?0:H(),transition:"margin-left 0.2s cubic-bezier(0.2, 0, 0, 1)"},children:(0,S.jsx)(o.A,{style:{minHeight:N(),overflow:h?"hidden":"auto"},children:(0,S.jsxs)(de,{style:{paddingTop:h?0:(0,P.BV)().compactMode?16:20,paddingRight:h?0:12,paddingLeft:h?0:12,paddingBottom:h?0:12},children:[l&&(0,S.jsx)(I.A,{}),a]})})})]}),(0,S.jsxs)(g.A.Group,{children:[f&&(0,S.jsx)(_.default,{data:{synced:!1},offlineData:!1,offline:t}),(0,S.jsx)(g.A.BackTop,{})]})]})})}}}]);