"use strict";(self.webpackChunkadmin_web_frontend=self.webpackChunkadmin_web_frontend||[]).push([[5489],{35489:(e,t,n)=>{n.r(t),n.d(t,{default:()=>re});var r=n(6375),a=n(29205),i=n(96185),o=n(68832),l=n(51664),s=n(9039),d=n(87094),c=n(41988),m=n(62215),p=n(78816),g=n(9950),u=n(79378),h=n(27153),x=n(31170),b=n(73965),f=n(73022),y=n(3646),k=n(65455),w=n(32077),j=n(42074),v=n(9636),A=n(1832),$=n(23072),P=n(37596),S=n(48353),I=n(44414);const{Text:z}=y.A,B=e=>{var t;let{data:n,offline:r}=e;const[a,i]=k.A.useModal(),o=(e=>{var t;let i=[{key:"1",label:(0,I.jsx)(j.N_,{to:(0,p.dW)("/user"),onClick:e=>(0,P.hx)(e,a),children:(0,I.jsx)(l.Ay,{icon:(0,I.jsx)(u.A,{}),type:"text",size:"small",style:{padding:0},children:e["admin.user.info"]})})},{key:"2",label:(0,I.jsx)(j.N_,{to:(0,p.dW)("/user-update-password"),onClick:e=>(0,P.hx)(e,a),children:(0,I.jsx)(l.Ay,{icon:(0,I.jsx)(h.A,{}),type:"text",size:"small",style:{padding:0},children:e["admin.changePwd"]})})},{key:"-",label:(0,I.jsx)($.A,{style:{marginTop:"5px",marginBottom:"5px",userSelect:"none",cursor:"none"}})}];return r||i.push({key:"3",label:(0,I.jsx)("a",{href:(0,p.XW)()+"admin/logout"+((0,p.M$)()?"?sp=true":""),onClick:e=>(0,P.hx)(e,a),children:(0,I.jsx)(l.Ay,{icon:(0,I.jsx)(x.A,{}),type:"text",size:"small",style:{padding:0},children:e["admin.user.logout"]})})}),null!==(t=n.lastVersion)&&void 0!==t&&t.upgrade&&(i=[{key:"99",label:(0,I.jsx)(j.N_,{to:(0,p.dW)("/upgrade"),onClick:e=>(0,P.hx)(e,a),children:(0,I.jsx)(w.A,{dot:!0,styles:{root:{whiteSpace:"nowrap"}},children:(0,I.jsxs)(l.Ay,{icon:(0,I.jsx)(b.A,{}),type:"text",size:"small",style:{padding:0},children:[e.newVersion," - (",n.lastVersion.version.version,"#",n.lastVersion.version.type,")"]})})})},...i]),i})((0,p.jY)()),s=()=>(0,S.BV)().compactMode?32:40;return(0,I.jsxs)(I.Fragment,{children:[i,(0,I.jsx)(v.A,{menu:{items:o},placement:"bottom",children:(0,I.jsxs)("div",{style:{color:(0,S.BV)().dark?"#ffffff":"#333333",borderRadius:0,marginRight:16,height:50,display:"flex",alignItems:"center"},children:[(0,I.jsx)(A.A,{preview:!1,fallback:p.Ay.getFillBackImg(),className:"userAvatarImg",src:n.header,style:{lineHeight:s(),width:s(),height:s()}}),(0,I.jsx)(w.A,{dot:null===(t=n.lastVersion)||void 0===t?void 0:t.upgrade,children:(0,I.jsx)(z,{style:{color:(0,S.BV)().dark?"#ffffff":"#333333",paddingLeft:8},children:n.userName})}),(0,I.jsx)(f.A,{})]})})]})};var V=n(65913),W=n(58203),C=n(97558),Y=n(90582),M=n(51840),F=n(50198),N=n(9774),T=n(66567),_=n(43078),E=n(60686),R=n(66276),X=n(17997),H=n(92019),L=n(89980),O=n(28429);function U(e,t){if(e.startsWith("#")){const n=e.slice(1);let r;if(3===n.length)r=65793*parseInt(n,16);else{if(6!==n.length)throw new Error("Invalid hexadecimal color format");r=parseInt(n,16)}return`rgba(${r>>16&255}, ${r>>8&255}, ${255&r}, ${t})`}if(e.startsWith("rgba("))return e.replace(/[^,]+(?=\))/,t.toString());if(e.startsWith("rgb("))return`rgba(${e.slice(e.indexOf("(")+1,e.lastIndexOf(","))}, ${t})`;throw new Error("Unsupported color format")}const D=()=>{const e=(0,O.zy)(),[t,n]=k.A.useModal(),r=()=>(0,S.BV)().compactMode?20:24;function a(n,r,a){const i=(t=>{let n=e.pathname.split(".")[0];return"/"===n&&(n="/index"),n.startsWith("/website")&&t.link.startsWith("/website")||n===t.link?{selected:!0,icon:t.selectIcon}:"#more"!==t.link?{selected:!1,icon:t.icon}:n.startsWith("/link")||n.startsWith("/nav")||n.startsWith("/article-type")?{selected:!0,icon:t.selectIcon}:{selected:!1,icon:t.icon}})(n),o=(0,I.jsxs)(j.N_,{to:(0,p.dW)(n.link),style:{color:"inherit",background:"transparent"},onClick:e=>{(0,P.hx)(e,t)},children:[i.icon,(0,I.jsx)("span",{className:"menu-title",children:n.text})]}),l={margin:0,width:"100%"};return a.length>0?{key:r,children:a,label:o,style:l}:{key:r,label:o,style:l}}const i=[a({text:(0,p.jY)().dashboard,link:"/index",selectIcon:(0,I.jsx)(V.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(W.A,{style:{fontSize:r()}})},"/index",[]),a({text:(0,p.jY)()["admin.log.edit"],link:(()=>{const t=(0,P.X8)(e.search).get("id");return t&&""!==t?`/article-edit?id=${t}`:"/article-edit"})(),selectIcon:(0,I.jsx)(C.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(Y.A,{style:{fontSize:r()}})},"/article-edit",[]),a({text:(0,p.jY)().blogManage,link:"/article",selectIcon:(0,I.jsx)(M.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(F.A,{style:{fontSize:r()}})},"/article",[]),a({text:(0,p.jY)()["admin.comment.manage"],link:"/comment",selectIcon:(0,I.jsx)(N.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(N.A,{style:{fontSize:r()}})},"/comment",[]),a({text:(0,p.jY)()["admin.plugin.manage"],link:"/plugin",selectIcon:(0,I.jsx)(T.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(_.A,{style:{fontSize:r()}})},"/plugin",[]),a({text:(0,p.jY)()["admin.setting"],link:"/website",selectIcon:(0,I.jsx)(E.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(R.A,{style:{fontSize:r()}})},"/website",[]),a({text:(0,p.jY)()["admin.more"],link:"#more",selectIcon:(0,I.jsx)(X.A,{style:{fontSize:r()}}),icon:(0,I.jsx)(H.A,{style:{fontSize:r()}})},"/more",[a({text:(0,p.jY)()["admin.type.manage"],link:"/article-type",selectIcon:(0,I.jsx)("span",{}),icon:(0,I.jsx)("span",{})},"/article-type",[]),a({text:(0,p.jY)()["admin.link.manage"],link:"/link",selectIcon:(0,I.jsx)("span",{}),icon:(0,I.jsx)("span",{})},"/link",[]),a({text:(0,p.jY)()["admin.nav.manage"],link:"/nav",selectIcon:(0,I.jsx)("span",{}),icon:(0,I.jsx)("span",{})},"/nav",[])])],o=()=>{const t=e.pathname.split(".")[0];return""===t||"/"===t||"/system"===t?["/index"]:t.startsWith("/website")||"/upgrade"===t||"/template-config"===t?["/website"]:t.startsWith("/link")||t.startsWith("/nav")||t.startsWith("/article-type")?["/more",t]:[t]},l=o(),[s,d]=(0,g.useState)(l);return(0,g.useEffect)(()=>{d(o())},[e.pathname]),(0,I.jsxs)(I.Fragment,{children:[n,(0,I.jsx)(L.A,{selectedKeys:s,items:i,theme:(0,S.BV)().dark?"dark":"light",style:{borderInlineEnd:"none",minHeight:"100%",background:(0,S.BV)().dark?"transparent":(0,S.BV)().colorPrimary+"10"}})]})};var G=n(44669),K=n(31743);const q=n(24937).Ay.div`
    .ant-menu-item {
        width: 100%;
    }

    .logo {
        overflow: hidden;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        &:hover {
            transform: scale(1.05);
            filter: drop-shadow(0 4px 8px ${e=>e.colorPrimary}60);
        }
    }

    .ant-layout-content {
        padding-left: 20px;
        padding-right: 20px;
    }

    .ant-layout-footer {
        padding: 24px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    }

    .ant-layout-footer-copyright {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .ant-layout-header {
        padding: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
            background: linear-gradient(90deg, transparent, ${e=>e.colorPrimary}20, transparent);
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
        height: 42px;
        line-height: 42px;
        margin-bottom: 4px;
        border-radius: 6px;
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
        }
    }

    /* Menu Item shape with glassmorphism */

    .ant-menu .ant-menu-item,
    .ant-menu-submenu-title {
        border-radius: 10px;
        margin-inline: 6px;
        width: calc(100% - 12px);
        backdrop-filter: blur(10px);
    }

    .ant-menu .ant-menu-item {
        border-radius: 10px !important;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 80%;
            height: 2px;
            background: ${e=>e.colorPrimary};
        }
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
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.75rem;
        font-weight: 700;
        background: linear-gradient(
            135deg,
            ${e=>e.colorPrimary} 0%,
            ${e=>e.colorPrimary}cc 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .userAvatarImg {
        border-radius: 50%;
        border: 3px solid transparent;
        background: linear-gradient(white, white) padding-box,
            linear-gradient(135deg, ${e=>e.colorPrimary}80, ${e=>e.colorPrimary}40) border-box;

        &:hover {
            box-shadow: 0 8px 16px ${e=>e.colorPrimary}40;
        }
    }

    /* Enhanced hover effects for menu items */

    .ant-menu-item:hover,
    .ant-menu-submenu-title:hover {
        background: linear-gradient(
            135deg,
            ${e=>U(e.colorPrimary,.12)} 0%,
            ${e=>U(e.colorPrimary,.08)} 100%
        ) !important;
        color: ${e=>e.colorPrimary} !important;
        box-shadow: 0 4px 12px ${e=>e.colorPrimary}20;

        .anticon {
            transform: scale(1.1);
            filter: drop-shadow(0 2px 4px ${e=>e.colorPrimary}40);
        }
    }

    .ant-menu-item-selected {
        background: linear-gradient(
            135deg,
            ${e=>U(e.colorPrimary,.2)} 0%,
            ${e=>U(e.colorPrimary,.15)} 100%
        ) !important;
        color: ${e=>e.colorPrimary} !important;
        font-weight: 600;
        box-shadow: 0 4px 12px ${e=>e.colorPrimary}30, inset 0 1px 0 ${e=>e.colorPrimary}40;

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

    .ant-card-body {
        padding: 24px;
    }

    /* Premium Table Design */

    .ant-table {
        border-radius: 12px;
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
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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

    .ant-table-wrapper {
        border-radius: 12px;
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
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;

        &:hover {
            box-shadow: 0 4px 12px ${e=>e.colorPrimary}40, 0 2px 4px ${e=>e.colorPrimary}30;
            background: linear-gradient(
                135deg,
                ${e=>e.colorPrimary}f0 0%,
                ${e=>e.colorPrimary}cc 100%
            );
        }

        &:active {
            transform: translateY(0);
        }
    }

    .ant-btn-default {
        border-color: #e0e0e0;
        transition: all 0.25s ease;

        &:hover {
            border-color: ${e=>e.colorPrimary};
            color: ${e=>e.colorPrimary};
        }
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
        border-radius: 6px;
    }

    .ant-upload {
        padding: 0 !important;
        box-sizing: content-box;
    }

    /* Refined Input Fields */

    .ant-input,
    .ant-input-number,
    .ant-select-selector {
        transition: all 0.25s ease;

        &:hover {
            border-color: ${e=>e.colorPrimary}80;
        }

        &:focus,
        &:focus-within {
            border-color: ${e=>e.colorPrimary};
            box-shadow: 0 0 0 3px ${e=>e.colorPrimary}15;
        }
    }

    /* Refined Dividers */

    .ant-divider {
        border-color: #e8eaed;

        .dark & {
            border-color: #2a2a2a;
        }
    }

    /* Typography enhancements */

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
`;var J=n(16661),Q=n(85221),Z=n(87085);const{Header:ee,Content:te,Sider:ne}=o.A,re=e=>{let{offline:t,children:n,loading:u,fullScreen:h,basicUserInfo:x,syncStaticSite:b,systemNotification:f}=e;const y=(0,J.A)(),k="sliderOpen",w=e=>{if(window.innerWidth<576){const e=(0,Q.Pn)(k);return void 0===e||null===e||e}return!0===e.xs},[j,v]=(0,g.useState)(window.innerWidth<576),A=w(y),[$,P]=(0,g.useState)(A);if((0,g.useEffect)(()=>{P(w(y)),v(!0===y.xs)},[y]),void 0===y.xs)return(0,I.jsx)(I.Fragment,{});const z=()=>`calc(100vh - ${V()}px)`,V=()=>(0,S.BV)().compactMode?54:64,W=()=>(0,S.BV)().compactMode?58:70;return(0,I.jsx)(K.A,{children:(0,I.jsxs)(q,{compactMode:(0,S.BV)().compactMode,colorPrimary:(0,S.BV)().colorPrimary,children:[f&&f.length>0&&(0,I.jsx)(s.A,{showIcon:!0,banner:!0,type:"info",title:f,style:{position:"fixed",zIndex:1,top:38,borderRadius:4,left:"50%",transform:"translateX(-50%)",width:"fit-content"}}),(0,I.jsxs)(ee,{style:{height:V(),display:h?"none":"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:(0,S.BV)().dark?"rgba(26, 26, 26, 0.85)":(0,S.BV)().colorPrimary+"10",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",paddingLeft:0,boxShadow:(0,S.BV)().dark?"0 4px 12px rgba(0, 0, 0, 0.3)":"0 4px 12px rgba(0, 0, 0, 0.08)"},children:[(()=>{const e=(0,I.jsx)("a",{href:(0,p.jY)().homeUrl+"?spm=admin&buildId="+(0,p.jY)().buildId,className:"logo",target:"_blank",title:(0,p.jY)().websiteTitle,style:{height:V(),width:W()},rel:"noopener noreferrer",children:(0,I.jsx)(r.A,{style:{fontSize:(0,S.BV)().compactMode?22:28,color:(0,S.BV)().dark?"rgb(255 255 255 / 65%)":"#333333"}})});return j?(0,I.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start"},children:[(0,I.jsx)("div",{style:{textAlign:"center",width:W(),height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,I.jsx)(l.Ay,{type:"primary",onClick:()=>{const e=!$;(0,Q.ls)(k,e),P(e)},children:$?(0,I.jsx)(a.A,{}):(0,I.jsx)(i.A,{})})}),e]}):e})(),t&&(0,I.jsx)("span",{style:{display:"inline-block",textAlign:"center",fontSize:20,paddingLeft:24,userSelect:"none",color:(0,S.BV)().colorPrimary,fontWeight:600,textShadow:`0 2px 8px ${(0,S.BV)().colorPrimary}40`},children:(0,p.jY)()["admin.offline.desc"]}),(0,I.jsx)(B,{offline:t,data:x})]}),(0,I.jsxs)(d.A,{style:{position:"relative",minHeight:z()},children:[(0,I.jsx)(ne,{width:W(),style:{opacity:h||$?0:1,position:"absolute",left:$?`-${W()}px`:"0",height:"100%",transform:h||$?"translateX(-100%)":"translateX(0)",backgroundColor:(0,S.BV)().dark?"rgba(26, 26, 26, 0.95)":"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",boxShadow:(0,S.BV)().dark?"4px 0 12px rgba(0, 0, 0, 0.3)":"4px 0 12px rgba(0, 0, 0, 0.08)"},children:(0,I.jsx)(D,{})}),(0,I.jsx)(c.A,{style:{flex:1,width:100,minHeight:h?0:1,marginLeft:$||h?0:W()},children:(0,I.jsx)(o.A,{style:{minHeight:z(),overflow:h?"hidden":"auto"},children:(0,I.jsxs)(te,{style:{paddingRight:h?0:12,paddingLeft:h?0:12,paddingBottom:h?0:12},children:[u&&(0,I.jsx)(G.A,{}),n]})})})]}),(0,I.jsxs)(m.A.Group,{children:[b&&(0,I.jsx)(Z.default,{data:{synced:!1},offlineData:!1,offline:t}),(0,I.jsx)(m.A.BackTop,{})]})]})})}}}]);