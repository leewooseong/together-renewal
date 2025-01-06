export default function ProfileLayout(props: IGetUserInfo) {
  function userImg(image: string) {
    if (!image) {
      return '/defaultProfileIcon.svg';
    }
    return image;
  }

  return (
    <div className="bg-white max-w-[996px] min-w-[343px] h-[178px] flex flex-col border-2 border-gray-200 rounded-3xl overflow-hidden relative">
      <div className="absolute right-[18px] z-10 top-[54px] left-[24px] w-[56px] h-[56px] rounded-full bg-none">
        <img src={userImg(props.image)} alt="프로필 이미지" />
      </div>

      <div className="bg-orange-400 w-full h-[66px] flex relative">
        <p className="font-semibold text-lg mt-[15px] ml-[24px]">내 프로필</p>
        <button>
          <img src="/editIcon.svg" className="absolute top-[18px] right-[18px] z-10" />
        </button>
        <img
          src="/profileBar.svg"
          className="mt-[13px] absolute left-[60%] md:left-[70%] -translate-x-1/2"
        />
        <div className="w-full border border-orange-600 absolute mt-[60px]"></div>
      </div>

      <div className="w-[240px] h-[77px] flex flex-col ml-[92px] mt-[15px]">
        <p>{props.name}</p>
        <div className="w-full h-[44px] flex flex-col justify-between text-sm mt-[9px]">
          <p>{`company. ${props.companyName}`}</p>
          <p className="">{`E-mail.  ${props.email}`}</p>
        </div>
      </div>
    </div>
  );
}
