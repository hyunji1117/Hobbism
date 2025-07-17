import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

export default function CommentSection() {
  return (
    <div>
      {/* 댓글 부붙 타이틀 */}
      <div>
        <span>댓글</span>
      </div>

      {/* 댓글 목록 */}
      <div>
        <CommentItem
          profileImage="/images/inhwan/profile-default.png"
          userName="댓글 작성자"
          timeAgo="1시간 전"
          comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
        />

        <CommentItem
          profileImage="/images/inhwan/profile-default.png"
          userName="댓글 작성자"
          timeAgo="1시간 전"
          comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
        />

        <CommentItem
          profileImage="/images/inhwan/profile-default.png"
          userName="댓글 작성자"
          timeAgo="1시간 전"
          comment="정말 날씨가 좋네요 저도 싸우러 갈게요!"
        />
      </div>

      {/* 댓글 입력창 */}
      <CommentInput profileImage="/images/inhwan/profile-default.png" />
    </div>
  );
}
