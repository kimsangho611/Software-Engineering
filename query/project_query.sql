use secondhand;

# ================= User =================
# 사용자 관련 Query

# 회원가입
insert into user(u_email, u_pw, u_name, u_phone) values ("ksh@naver.com", "1234", "김상호", "01012345678");

# 회원정보 수정
update user 
set u_pw = "2345"
where u_email = "ksh@naver.com" and u_name = "김상호" and u_phone = "01012345678";

# 회원탈퇴
delete  
from user
where u_email = "ksh@naver.com" and u_pw = "2345";

# 사용자 정지
update user
set u_report = 1
where u_email = "";

# 사용자 조회 - 이메일, 이름, 휴대폰, 가입날짜, 상품판매횟수
select u.u_email, u.u_name, u.u_phone, u.u_sign_date, count(*) as sell_count
from user u join product p on u.u_id = p.User_u_id
where u.u_id = 1;

# 신고처리 리스트


# 신고처리 상세보기


# 사용자 정지 - 사용자의 이메일과 동일한 아이디를 가진 사용자를 정지함
update user
set u_report = ""
where u_email = "";

# 로그인 - 로그인 정보(이메일, 비밀번호)와 맞는 데이터의 개수를 반환
select count(*)
from user u
where u.u_email = "" and u_pw = "";

# hot, new item 리스트 반환


# 상품 문의 댓글 조회


# 상품 문의 댓글 (구매자) 작성


# 상품 문의 대댓글 (판매자) 작성


# 현재 포인트 조회
select u_point 
from user 
where u_id = 1;


# 1:1 문의 작성


# 검색 - 상품의 제목에서 원하는 검색 결과가 있는 상품 정보를 선택함.
select count(*), p.*
from product p
where trim(p.p_title) like "%{}%";


# 찜

# ================= 마이페이지 구매/판매/활동 목록 =================
# 상품 관련 Query

# 구매 목록 - 사용자의 상품 구매 목록을 선택함
select *
from product p
where p.p_id = (
	select o.Product_p_id
    from user u join market.order o on u.u_id = o.User_u_id
    where u.u_id = 1);
    
# 판매 목록 - 사용자가 판매하기 위해 올린 상품들을 선택함
select p.*
from user u join product p on u.u_id = p.User_u_id
where u.u_id = 1;

# 활동 목록
# type = 1 -> 찜한 게시물


# type = 2 -> 댓글 단 게시물


# ================= Product =================
# 상품 관련 Query

SELECT * FROM product;
# 상품 등록
insert into product(p_thumnail, p_image, p_category1, p_category2, p_title, p_price, p_listprice, p_size, p_status, p_puton_count, p_dirty, p_contents, User_u_id) 
values (null, null, "카테고리1", "카테고리2", "블라우스 팝니다.", 30000, 100000, "S", "좋음", 10, "N", "많이 입지 않은 블라우스 팝니다.", 1);

# 개별 상품 디테일 
select * 
from product 
where p_id = 1;

# HOT item 상위 N개 선택하기
select * 
from product
order by p_view DESC
LIMIT 10;

# 카테고리와 가격 범위 필터에 맞는 상품 반환
# 1 -> 최근 등록순으로 내림차순으로 정렬하여 가격 범위내에 있는 상품들을 선택함
select * 
from product
where p_price between 0 and 100000
order by p_date DESC;

# 2 -> 조회가 많은 순으로 내림차순으로 정렬하여 가격 범위내에 있는 상품들을 선택함
select * 
from product
where p_price between 0 and 100000
order by p_view DESC;

# ================= Announce =================
# 공지사항 관련 Query

# 공지사항 리스트 
select * from announce;

# 공지사항 세부조회 - 세부 조회이후 조회수를 증가시키기 위해 update문을 같이 실행하도록 함
select * 
from announce
where post_id = 1;

update announce 
set post_view = post_view + 1
where post_id = 1; # 공지사항 세부조회시 조회수 증가시키는 쿼리

# 공지사항 등록
insert into announce(post_title, post_contents)
values ("", "");

# 공지사항 변경
update announce
set post_title = "" and post_contents = ""
where post_id = 1;

# 공지사항 삭제
delete from announce
where post_id = 1;

# ================= Question =================
# 문의사항 관련 Query

# 1:1 문의 - 사용자 쪽에 1:1 문의 관련 정보를 전달하는 쿼리
select q.q_title, q.q_date, q.q_contents, q.q_answer
from user u join questions q on u.u_id = q.User_u_id
where u.u_id = 1;

# 1:1 문의 작성
insert into questions(q_title, q_contents, User_u_id) 
values ("포인트가 안들어 옵니다.", "거래 확정난지 삼일째인데 포인트가 안들어 옵니다.", 1);

# 문의사항 리스트 조회 - 관리자쪽에서 1:1 문의 온 모든 정보 선택하여 출력함
select u.u_email, q.q_title, q.q_date, q.q_answer
from user u join questions q on u.u_id = q.User_u_id;

# 문의사항 세부사항 조회 - 관리자쪽에서 1:1 문의사항의 세부사항 조회
select u.u_email, q.q_title, q.q_contents, q.q_answer
from user u join questions q on u.u_id = q.User_u_id
where q.q_id = 1;

# 문의사항 답변 등록 - 관리자쪽에서 1:1 문의사항 답변을 작성
update questions
set q_answer = ""
where q_id = 1; 


# ================= 게시물 =================
# 게시물 관련 Query

# 게시물 관리 (게시물 조회) - 관리자에서 현재 게시물에 등록된 모든 상품을 출력함
select p.p_id, u.u_email, p.p_trade, p.p_date
from user u join product p on u.u_id = p.User_u_id;

# 게시물 삭제 - 관리자가 선택한 게시물 삭제
delete from product
where p_id = 1;






