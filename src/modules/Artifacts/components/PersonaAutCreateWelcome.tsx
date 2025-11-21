import { Language } from "../i18n/language.i18n";
import { welcome } from "../i18n/personaAut.i18n";

type Props = {
    language: string;
}

const PersonaAutCreateWelcome = ({ language }: Props) => {
    return (
        <div>
            <p>{
                language === Language.Portuguese
                    ? welcome[0].pt
                    : welcome[0].en
            }</p>
            <p className="mt-[20px]">{
                language === Language.Portuguese
                    ? welcome[1].pt
                    : welcome[1].en
            }</p>
        </div>
    )
}

export default PersonaAutCreateWelcome;