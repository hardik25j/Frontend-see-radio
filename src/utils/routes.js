import DashBoard from "../component/dashboard/DashBoard";
import AddCampaign from "../component/admin/add-campaign/AddCampaign";
import UploadFiles from "../component/admin/UploadFiles";
import CampaignTable from "../component/campaigns/active-campaign-table/CampaignTable";
import AdvertiserTable from "../component/advertiser/AdvertiserTable";
import CampaignMarketTable from "../component/campaigns/campaign-in-market/CampaignMarketTable";
import CompletedCampaignTable from "../component/campaigns/completed-camp/CompletedCampaignTable";
import Login from "../component/Login";
import CampaignDetail from "../component/campaigns/active-campaign-table/CampaignDetail";
import AddAdvertiser from "../component/admin/AddAdvertiser";

const routes = [
	{
		route: "public",
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		route: "private",
		path: "/dashboard",
		name: "dashboard",
		component: DashBoard,
	},
	{
		route: "private",
		path: "/client-contract",
		name: "addAdvertiser",
		component: AddAdvertiser,
	},
	{
		route: "private",
		path: "/add-campaign",
		name: "campaign",
		component: AddCampaign,
	},
	{
		route: "private",
		path: "/upload-files",
		name: "uploadFiles",
		component: UploadFiles,
	},
	{
		route: "private",
		path: "/campaign-table",
		name: "campaignTable",
		component: CampaignTable,
	},
	{
		route: "private",
		path: "/client-report",
		name: "clientReport",
		component: AdvertiserTable,
	},
	{
		route: "private",
		path: "/campaigns-in-market",
		name: "campaignsInMarket",
		component: CampaignMarketTable,
	},
	{
		route: "private",
		path: "/completed-campaign",
		name: "completedCampaign",
		component: CompletedCampaignTable,
	},
	{
		route: "private",
		path: "/campaign-detail/:id",
		name: "campaignDetail",
		component: CampaignDetail,
	}
];

export default routes;