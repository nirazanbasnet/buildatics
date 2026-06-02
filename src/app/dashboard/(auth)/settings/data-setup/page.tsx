import { dataSetupGroups } from "../_data";
import { DataSetup } from "../_components/data-setup";

export default function DataSetupPage() {
  return <DataSetup groups={dataSetupGroups} />;
}
