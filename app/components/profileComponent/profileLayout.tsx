import Image from 'next/image';

export default function ProfileLayout({image, name, companyName, email}: IGetUserInfo) {
  function userImg(img: string) {
    if (!img) {
      return '/defaultProfileIcon.svg';
    }
    return img;
  }

  return (
    <div className="bg-white max-w-[996px] min-w-[343px] h-[178px] flex flex-col border-2 border-gray-200 rounded-3xl overflow-hidden relative">
      <div className="absolute right-[18px] z-10 top-[54px] left-[24px] w-[56px] h-[56px] rounded-full bg-none">
        <Image src={userImg(image)} alt="프로필 이미지" />
      </div>

      <div className="bg-orange-400 w-full h-[66px] flex relative">
        <p className="font-semibold text-lg mt-[15px] ml-[24px]">내 프로필</p>
        <button type="button" aria-label="Edit Profile">
          <Image
            src="/editIcon.svg"
            className="absolute top-[18px] right-[18px] z-10"
            alt="수정 아이콘"
          />
        </button>
        <Image
          src="/profileBar.svg"
          className="mt-[13px] absolute left-[60%] md:left-[70%] -translate-x-1/2"
          alt="프로필 상단 이미지"
        />
        <div className="w-full border border-orange-600 absolute mt-[60px]" />
      </div>

      <div className="w-[240px] h-[77px] flex flex-col ml-[92px] mt-[15px]">
        <p>{name}</p>
        <div className="w-full h-[44px] flex flex-col justify-between text-sm mt-[9px]">
          <p>{`company. ${companyName}`}</p>
          <p className="">{`E-mail.  ${email}`}</p>
        </div>
      </div>
    </div>
  );
}
