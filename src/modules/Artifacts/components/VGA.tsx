import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Watch } from "../hooks/usePersonaAutForm";
import { useVGA } from "../hooks/useVGA";
import { Language } from "../i18n/language.i18n";

type Props = {
    watch: Watch;
    language: string;
}

const VGA = ({ watch, language }: Props) => {
    const { dataVGA } = useVGA(watch);

    return (
        <div>
            <ResponsiveContainer width={"100%"} height={300}>
                <LineChart data={dataVGA} margin={
                    {
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }

                }>
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey={
                        language === Language.Portuguese
                            ? "pt"
                            : "en"
                    }
                    />
                    <YAxis unit={"%"} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line type={"linear"} dataKey={"percentage"} stroke={"#20B4F8"} name={
                        language === Language.Portuguese
                            ? "Nível de Comprometimento"
                            : "Level of Impairment"
                    } />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default VGA;