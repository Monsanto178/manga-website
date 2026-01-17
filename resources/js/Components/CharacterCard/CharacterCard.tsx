import { CharacterType } from "@/Types";

export const CharacterCard = ({character, role} : CharacterType) => {
    return (
        <>
            <button className="relateCard flex flex-col sm:flex-row text-white w-[110px] h-[220px] sm:min-w-[300px] sm:w-[31%] sm:max-w-[500px] sm:h-[160px] bg-[#363636] overflow-hidden rounded-[15px] transition-transform duration-300 hover:scale-110 overflow-hidden cursor-pointer">
                <picture className="w-[100%] h-[60%] min-w-[105px] sm:h-auto sm:w-[30%] sm:min-w-[119px] sm:max-h-[160px]">
                    <img className="w-full h-full object-cover object-center" src={character.images.webp.image_url} alt="img" />
                </picture>
                <div className="flex flex-col justify-between p-4 w-full sm:w-[69%]">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <strong 
                            className="block text-[14px] sm:text-[16px] w-fit overflow-hidden text-ellipsis"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    }}
                            >{character.name}</strong>
                        </div>
                    </div>
                    <div className="text-[12px] sm:text-[16px] flex justify-between">
                        <span>{role}</span>
                    </div>
                </div>
            </button>
            {/* <a href='/' className="relateCard flex flex-col text-white w-[100px] h-[220px] bg-[#363636] overflow-hidden rounded-[15px] transition-transform duration-300 hover:scale-110 overflow-hidden cursor-pointer">
                <picture className="w-[100%] h-[60%]">
                    <img className="w-full h-full object-cover object-center" src={character.images.webp.image_url} alt="img" />
                </picture>
                <div className="flex flex-col justify-between p-4">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <strong 
                            className="block text-[14px] sm:text-[16px] w-full overflow-hidden text-ellipsis"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    }}
                            >{character.name}</strong>
                        </div>
                    </div>
                    <div className="text-[12px] sm:text-[16px] flex justify-between">
                        <span>{role}</span>
                    </div>
                </div>
            </a> */}
        </>
    )
}