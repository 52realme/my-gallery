constSUPABASE_URL="tzngdbmhkekhhviswayp";
ConstSUPABASE_KEY=sb_publishable_oMVUk-B7IntxqGCujXWo-W_t8AG50Um
Const桶="画廊";

Const剧本=文件.createElement("脚本");
脚本.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
脚本.onload=startGallery;
文件.头.appendChild(脚本);

异步 功能 startGallery() {
  Const{ createClient }=窗户.子基;
  Const子基=createClient(SUPABASE_URL, SUPABASE_KEY);

  文件.身体.innerHTML=`
<div style="max-width:900px；margin:auto；padding:30px18px；font-family:Arial，sans-serif">
<h1>我的图片空间</h1>
      <p>上传的图片会保存到云端，其他人打开网站也能看到。</p>

<标签样式="
显示：内联块；
填料：12px20px；
背景：#111；
颜色：白色；
边界半径：12px；
光标：指针；
">
        ＋ 上传图片
<input id="upload"type="file"accept="image/*"多个隐藏>
</label>

<p id="status"></p>

<div id="库"style="
显示：网格；
网格模板列：重复(自动填充，最小值(180px，1fr))；
间隙：15px；
margin-top:25px；
"></div>
</div>
`;

  Const上传=文件.getElementById("上传");
  Const画廊=文件.getElementById("库");
  Const状态=文件.getElementById("状态");

  异步 功能 loadImages() {
    画廊.innerHTML="正在加载图片……";

    Const{ 数据, 误差 }=等候 子基
      .存储
      .从……起(桶)
      .列表("", {
        限制: 100,
        sortBy: { 柱: "创建时间(_at)", 顺序: "描述" }
      });

    如果 (误差) {
      画廊.innerHTML="加载失败："+误差.消息;
      返回;
    }

    画廊.innerHTML="";

    如果 (!数据||数据.长度===0) {
      画廊.innerHTML="暂时还没有图片";
      返回;
    }

    数据.foreach(文件=>{
      Const{ 数据: urlData }=子基
        .存储
        .从……起(桶)
        .getPublicUrl(文件.姓名);

      Const盒=文件.createElement("div");

      盒子.innerHTML=`
<img src="${urlData.publicURL}"
风格="
宽度：100%；
纵横比：1；
对象匹配：盖；
边界半径：14px；
显示：块；
">
`;

      画廊.appendChild(盒子);
    });
  }

  上传.addEventListener("更改", 异步 ()=>{
    Const文件=[...上传.文件];

    如果 (!文件.长度) 返回;

    状态.textContent="正在上传……";

    为 (Const文件……的文件) {
      Const文件名=
        日期.现在()+"-"+
        数学.随机().toString(36).片(2)+
        "-"+
        文件.姓名.取代(/[^\w.\u4e00-\u9fff-]/g, "_");

      Const{ 误差 }=等候 子基
        .存储
        .从……起(桶)
        .上传(文件名, 文件);

      如果 (误差) {
        状态.textContent="上传失败："+误差.消息;
        返回;
      }
    }

    状态.textContent="上传成功！";

    上传.价值="";
    等候 loadImages();
  });

  loadImages();
}
