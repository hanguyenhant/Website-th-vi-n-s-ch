package com.example.androidcomicreader;

import android.app.AlertDialog;
import android.database.Cursor;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.androidcomicreader.Adapter.MyChapterAdapter;
import com.example.androidcomicreader.Adapter.MyViewPagerAdapter;
import com.example.androidcomicreader.Common.Common;
import com.example.androidcomicreader.Model.Chapter;
import com.example.androidcomicreader.Model.Link;
import com.example.androidcomicreader.Retrofit.IComicAPI;
import com.wajahatkarim3.easyflipviewpager.BookFlipPageTransformer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import dmax.dialog.SpotsDialog;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class ViewDetail extends AppCompatActivity {
    IComicAPI iComicAPI;
    ViewPager myViewPager;
    CompositeDisposable compositeDisposable = new CompositeDisposable();
    TextView txt_chapter_name;
    View back, next;
    Cursor c;

    List<Link> linkList = new ArrayList<>();
    MyViewPagerAdapter adapter;
    @Override
    protected void onStop() {
        compositeDisposable.clear();
        super.onStop();
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_detail);

        // thêm new
        SQLiteDataController db = new SQLiteDataController(this);
        try {
            db.isCreatedDatabase();
        } catch (IOException e) {
            e.printStackTrace();
        }
        db.openDataBase();
        c = db.queryLink();

        // end them new

        iComicAPI = Common.getAPI();
        myViewPager = (ViewPager) findViewById(R.id.view_pager);
        txt_chapter_name = (TextView) findViewById(R.id.txt_chapter_name);
        next = findViewById(R.id.chapter_next);
        back = findViewById(R.id.chapter_back);

//        final AlertDialog dialog = new SpotsDialog.Builder().setContext(this).setMessage("Please wait...").setCancelable(false).build();
//        dialog.show();
//        String str1 = " Dragon Ball";
//        String str2 = "Chapter 1 : Bloomers and the Monkey King";
//        if((Common.selected_comic.getName().equals(str1) )&& (Common.selected_chapter.getName().equals(str2))){
//            c.moveToFirst();
//            while ((!c.isAfterLast())&& (c.getInt(2) == 13)){
//                Link link = new Link(c.getInt(0), c.getString(1), 13);
//                linkList.add(link);
//                c.moveToNext();
//
//            }
//
//            adapter = new MyViewPagerAdapter(ViewDetail.this, linkList);
//            myViewPager.setAdapter(adapter);
//
//
//        }

//        switch (Common.selected_comic.getName()){
//            case " Dragon Ball" :
//            {
//                switch (Common.selected_chapter.getName()) {
//                    case "Chapter 1 : Bloomers and the Monkey King" :
//                    {
////                        back.setOnClickListener(new View.OnClickListener() {
////                            @Override
////                            public void onClick(View view) {
////                                if (Common.chapter_index == 0) {
////                                    Toast.makeText(ViewDetail.this, "You are reading chapter", Toast.LENGTH_SHORT).show();
////
////                                } else {
//                                  //  Common.chapter_index--;
//                                  //  fetchLinks(Common.chapterList.get(Common.chapter_index).getID());
//
//                                   c.moveToFirst();
//                                    while ((!c.isAfterLast())&& (c.getInt(2) == 13)){
//                                        Link link = new Link(c.getInt(0), c.getString(1), 13);
//                                        linkList.add(link);
//                                        c.moveToNext();
//
//                                    }
//
//                                    adapter = new MyViewPagerAdapter(ViewDetail.this, linkList);
//                                    myViewPager.setAdapter(adapter);
//
//                                    txt_chapter_name.setText(Common.formatString(Common.selected_chapter.getName()));
//
//                                    //Create book Flip page
//                                    BookFlipPageTransformer bookFlipPageTransformer = new BookFlipPageTransformer();
//                                    bookFlipPageTransformer.setScaleAmountPercent(10f);
//                                    myViewPager.setPageTransformer(true, bookFlipPageTransformer);
//                                    dialog.dismiss();
//
//                                    adapter.notifyDataSetChanged();
//                                    break;
//
//                     }
//
//                    case "k":
//                        break;
//
//                }
//                    //    });
//
//                        next.setOnClickListener(new View.OnClickListener() {
//                            @Override
//                            public void onClick(View v) {
//                                if (Common.chapter_index == Common.chapterList.size() - 1) // if user in last chapter but press nẽt
//                                {
//                                    Toast.makeText(ViewDetail.this, "You are reading chapter", Toast.LENGTH_SHORT).show();
//
//                                } else {
//                                    Common.chapter_index++;
//                                  //  fetchLinks(Common.chapterList.get(Common.chapter_index).getID());
//
//                                }
//                            }
//                        });
//



 //           }
        //}


//}

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(Common.chapter_index == 0){
                    Toast.makeText(ViewDetail.this, "You are reading first chapter", Toast.LENGTH_SHORT).show();

                }else {
                    Common.chapter_index--;
                    fetchLinks(Common.chapterList.get(Common.chapter_index).getID());

                }

            }
        });

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(Common.chapter_index == Common.chapterList.size() - 1) // if user in last chapter but press nẽt
                {
                    Toast.makeText(ViewDetail.this, "You are reading last chapter", Toast.LENGTH_SHORT).show();

                }else {
                    Common.chapter_index++;
                    fetchLinks(Common.chapterList.get(Common.chapter_index).getID());

                }
            }
        });
        fetchLinks(Common.selected_chapter.getID());

    }
    private void fetchLinks(int id){
       c.moveToFirst();
        while ((!c.isAfterLast()) ){
            if(((c.getInt(2))== id)) {
                Link link = new Link(c.getInt(0), c.getString(1));
                linkList.add(link);
                c.moveToNext();
            }
            else{
                c.moveToNext();
            }
        }
        if(linkList != null) {
            MyViewPagerAdapter myViewPagerAdapter = new MyViewPagerAdapter(ViewDetail.this, linkList);
            myViewPager.setAdapter(myViewPagerAdapter);
        }
        else{
            Toast.makeText(ViewDetail.this,"rong", Toast.LENGTH_SHORT).show();
        }
        txt_chapter_name.setText(Common.formatString(Common.selected_chapter.getName()));

        //Create book Flip page
        BookFlipPageTransformer bookFlipPageTransformer = new BookFlipPageTransformer();
        bookFlipPageTransformer.setScaleAmountPercent(10f);
        myViewPager.setPageTransformer(true, bookFlipPageTransformer);

    }




//    private void fetchLinks(int id) {
//        final AlertDialog dialog = new SpotsDialog.Builder().setContext(this).setMessage("Please wait...").setCancelable(false).build();
//        dialog.show();
//
//        compositeDisposable.add(iComicAPI.getImageList(id)
//                .subscribeOn(Schedulers.io())
//                .observeOn(AndroidSchedulers.mainThread())
//                .subscribe(new Consumer<List<Link>>() {
//                               @Override
//                               public void accept(List<Link> links) throws Exception {
//                                   MyViewPagerAdapter adapter = new MyViewPagerAdapter(getBaseContext(), links);
//                                   myViewPager.setAdapter(adapter);
//
//                                   txt_chapter_name.setText(Common.formatString(Common.selected_chapter.getName()));
//
//                                   //Create book Flip page
//                                   BookFlipPageTransformer bookFlipPageTransformer = new BookFlipPageTransformer();
//                                   bookFlipPageTransformer.setScaleAmountPercent(10f);
//                                   myViewPager.setPageTransformer(true, bookFlipPageTransformer);
//                                  // dialog.dismiss();
//
//
//                               }
//                           }, new Consumer<Throwable>() {
//                               @Override
//                               public void accept(Throwable throwable) throws Exception {
//                                   Toast.makeText(ViewDetail.this, "This chapter í being tránlating", Toast.LENGTH_LONG).show();
//                                   dialog.dismiss();
//                               }
//                           }
//                ));
//
  }

 /*   private void fetchLinks(int id) {
        final AlertDialog dialog = new SpotsDialog.Builder().setContext(this).setMessage("Please wait...").setCancelable(false).build();
        dialog.show();

        compositeDisposable.add(iComicAPI.getImageList(id)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<List<Link>>() {
                               @Override
                               public void accept(List<Link> links) throws Exception {
                                   MyViewPagerAdapter adapter = new MyViewPagerAdapter(getBaseContext(), links);
                                   myViewPager.setAdapter(adapter);

                                   txt_chapter_name.setText(Common.formatString(Common.selected_chapter.getName()));

                                   //Create book Flip page
                                   BookFlipPageTransformer bookFlipPageTransformer = new BookFlipPageTransformer();
                                   bookFlipPageTransformer.setScaleAmountPercent(10f);
                                   myViewPager.setPageTransformer(true, bookFlipPageTransformer);
                                   dialog.dismiss();


                               }
                           }, new Consumer<Throwable>() {
                               @Override
                               public void accept(Throwable throwable) throws Exception {
                                   Toast.makeText(ViewDetail.this, "This chapter í being tránlating", Toast.LENGTH_LONG).show();
                                   dialog.dismiss();
                               }
                           }
                ));

    }*/
//}
