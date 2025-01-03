const hearts = [false, false, false, false, false];


export function ReviewScore({ score }: { score: number }) {
  const heartScore = hearts.fill(true, 5 - score)

  return (
    <div className=" flex gap-1">
      {heartScore.map((heart) =>
        (heart ? <img src="/heart-active.svg" alt="찬 하트" /> : <img src="/heart-default.svg" alt="빈 하트" />))}
    </div>
  )
}
