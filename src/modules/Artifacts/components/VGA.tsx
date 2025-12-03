import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useVGA } from "../hooks/useVGA";
import useDefault from "../hooks/useDefault";

interface Props {
  interactionList: string[];
  cognitionList: string[];
  communicationList: string[];
  behaviorList: string[];
}

const VGA = ({
  interactionList,
  cognitionList,
  communicationList,
  behaviorList,
}: Props) => {
  const { dataVGA } = useVGA({
    interactionList,
    cognitionList,
    communicationList,
    behaviorList,
  });

  const { exibirTexto } = useDefault();

  return (
    <div>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          data={dataVGA}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={exibirTexto("pt", "en")} />
          <YAxis unit={"%"} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line
            type={"linear"}
            dataKey={"percentage"}
            stroke={"#20B4F8"}
            name={exibirTexto(
              "Nível de Comprometimento",
              "Level of Impairment",
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VGA;
