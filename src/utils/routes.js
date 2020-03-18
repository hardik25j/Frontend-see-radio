import DashBoard from "../component/DashBoard";
import ClientContract from "../client-contract/ClientContract";

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		component: DashBoard,
	},
	{
		path: "/client-contract",
		name: "Advertiser",
		component: ClientContract,
	},
	{
		path: "/add-campaign",
		name: "Campaign",
		// component: Campaign,
	},
	{
		path: "/add-salesperson",
		name: "SalesPerson",
		// component: AddSalesPerson,
	},
	{
		path: "/account-listing",
		name: "AccountListing",
		// component: AccountListing,
	},
];

export default dashboardRoutes;