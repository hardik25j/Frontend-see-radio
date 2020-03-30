import DashBoard from "../component/DashBoard";
import ClientContract from "../component/admin/client-contract/ClientContract";
import AddCampaign from "../component/admin/add-campaign/AddCampaign";
import UploadFiles from "../component/admin/UploadFiles";
import CampaignTable from "../component/campaigns/active-campaign-table/CampaignTable";
import AdvertiserTable from "../component/advertiser/AdvertiserTable";
import CampaignMarketTable from "../component/campaigns/campaign-in-market/CampaignMarketTable";
import CompletedCampaignTable from "../component/campaigns/completed-camp/CompletedCampaignTable";

const routes = [
	{
		path: "/dashboard",
		name: "dashboard",
		component: DashBoard,
	},
	{
		path: "/client-contract",
		name: "advertiser",
		component: ClientContract,
	},
	{
		path: "/add-campaign",
		name: "campaign",
		component: AddCampaign,
	},
	{
		path: "/upload-files",
		name: "uploadFiles",
		component: UploadFiles,
	},
	{
		path: "/campaign-table",
		name: "campaignTable",
		component: CampaignTable,
	}, {
		path: "/client-report",
		name: "clientReport",
		component: AdvertiserTable,
	}, {
		path: "/campaigns-in-market",
		name: "campaignsInMarket",
		component: CampaignMarketTable,
	}, {
		path: "/completed-campaign",
		name: "completedCampaign",
		component: CompletedCampaignTable,
	},
];

export default routes;