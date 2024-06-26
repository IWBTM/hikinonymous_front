import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import api from "../../api/api";
import {
  Accessibility as PrivacyIcon,
  AccountTree as CmsMenuIcon,
  BallotOutlined as BoardIcon,
  CategoryOutlined as CategoryIcon,
  CheckBox as TermIcon,
  GridOn as CodeIcon,
  Help as InquiryIcon, LiveHelp as FaqIcon, Notifications as NoticeIcon, NotInterested as DropMemberIcon,
  OpenInBrowser as PopupIcon,
  PersonOutline as MemberIcon,
  SupervisorAccountOutlined as AdminIcon,
  ViewAgenda as FrontMenuIcon,
  VpnKey as AuthIcon,
  Web as BannerIcon,
  WebOutlined as SiteIcon,
} from "@material-ui/icons";

export default function Tables({
                                 tableData,
                                 title,
                                 menuInfo,
                               }) {

  const [ resultList, setResultList ] = useState([]);
  const [ columnList, setColumnList ] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(menuInfo.link);
        if (response.data.code === 200) {
          let data = response.data.data;

          switch (menuInfo.code) {
            case 'ADMIN_MANAGEMENT': {
              setColumnList([
                'NO',
                '이메일',
                '이름',
                '마지막 로그인일',
                '계정 상태',
                '사용 여부',
                '생성일'
              ]);
              setResultList(
                data.map((result) => {
                  return [
                    result.managerSeq,
                    result.managerId,
                    result.managerNm,
                    result.lastLoginDate,
                    result.managerStatus,
                    result.useYn,
                    result.regDate,
                  ];
                })
              );
            }
            case 'SITE_MANAGEMENT': return <SiteIcon/>;
            case 'MEMBER_MANAGEMENT': return <MemberIcon/>;
            case 'CATEGORY_MANAGEMENT': return <CategoryIcon/>;
            case 'BOARD_MANAGEMENT': return <BoardIcon/>;
            case 'TERM_MANAGEMENT': return <TermIcon/>;
            case 'CODE_MANAGEMENT': return <CodeIcon/>;
            case 'CMS_MENU_MANAGEMENT': {
              setColumnList([
                'NO',
                '이름',
                '메뉴 레벨',
                '순서'
              ]);
              setResultList(
                data.map((result) => {
                  return [
                    result.cmsMenuSeq,
                    result.menuNm,
                    result.menuLevel,
                    result.sortOrder,
                  ];
                })
              );
            }
            case 'ADMIN_AUTH_MANAGEMENT': return <AuthIcon/>;
            case 'FRONT_MENU_MANAGEMENT': return <FrontMenuIcon/>;
            case 'POPUP_MANAGEMENT': return <PopupIcon/>;
            case 'BANNER_MANAGEMENT': return <BannerIcon/>;
            case 'INQUIRY_MANAGEMENT': return <InquiryIcon/>;
            case 'FAQ_MANAGEMENT': return <FaqIcon/>;
            case 'NOTICE_MANAGEMENT': return <NoticeIcon/>;
            case 'DROP_MEMBER_MANAGEMENT': return <DropMemberIcon/>;
            case 'PRIVACY_MANAGEMENT': return <PrivacyIcon/>;
          }

          setResultList(data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <>
      <PageTitle title={`${title} > ${menuInfo.label}`} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={menuInfo.label}
            data={resultList}
            columns={columnList}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <Widget title="Material-UI Table" upperTitle noBodyPadding>*/}
        {/*    <Table data={mock.table} />*/}
        {/*  </Widget>*/}
        {/*</Grid>*/}
      </Grid>
    </>
  );
}
