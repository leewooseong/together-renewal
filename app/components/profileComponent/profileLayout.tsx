import Image from 'next/image';

export default function ProfileLayout({image, name, companyName, email}: IGetUserInfo) {
  function userImg(img: string) {
    if (!img) {
      return '/defaultProfileIcon.svg';
    }
    return img;
  }

  return (
    <div className="relative flex h-[178px] min-w-[343px] max-w-[996px] flex-col overflow-hidden rounded-3xl border-2 border-gray-200 bg-white">
      <div className="absolute left-[24px] right-[18px] top-[54px] z-10 h-[56px] w-[56px] rounded-full bg-none">
        <Image src={userImg(image)} alt="프로필 이미지" />
      </div>

      <div className="relative flex h-[66px] w-full bg-orange-400">
        <p className="ml-[24px] mt-[15px] text-lg font-semibold">내 프로필</p>
        <button type="button" aria-label="Edit Profile">
          <Image
            src="/editIcon.svg"
            className="absolute right-[18px] top-[18px] z-10"
            alt="수정 아이콘"
          />
        </button>
        <Image
          src="/profileBar.svg"
          className="absolute left-[60%] mt-[13px] -translate-x-1/2 md:left-[70%]"
          alt="프로필 상단 이미지"
        />
        <div className="absolute mt-[60px] w-full border border-orange-600" />
      </div>

      <div className="ml-[92px] mt-[15px] flex h-[77px] w-[240px] flex-col">
        <p>{name}</p>
        <div className="mt-[9px] flex h-[44px] w-full flex-col justify-between text-sm">
          <p>{`company. ${companyName}`}</p>
          <p className="">{`E-mail.  ${email}`}</p>
        </div>
      </div>
    </div>
  );
}
