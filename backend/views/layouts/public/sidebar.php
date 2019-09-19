<div class="page-sidebar navbar-collapse collapse">
    <!-- BEGIN SIDEBAR MENU -->
    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
    <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
        <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
        <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
        <li class="sidebar-toggler-wrapper hide">
            <div class="sidebar-toggler">
                <span></span>
            </div>
        </li>
        <!-- END SIDEBAR TOGGLER BUTTON -->
        <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
        <li class="sidebar-search-wrapper">
            <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
            <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
            <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
            <form class="sidebar-search  " action="page_general_search_3.html" method="POST">
                <a href="javascript:;" class="remove">
                    <i class="icon-close"></i>
                </a>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                            <a href="javascript:;" class="btn submit">
                                                <i class="icon-magnifier"></i>
                                            </a>
                                        </span>
                </div>
            </form>
            <!-- END RESPONSIVE QUICK SEARCH FORM -->
        </li>

        <!-- 开始导航循环 -->

        <?php if (!empty($allMenu['child']) && is_array($allMenu['child']) ): ?>
            <?php foreach($allMenu['child'] as $menu): ?>
                <li class="nav-item ">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <i class="<?= $menu['icon'] ?>"></i>
                        <span class="title"><?= $menu['name'] ?></span>

                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <?php if(!empty($menu['_child']) && is_array($menu['_child'])): ?>
                            <?php foreach ($menu['_child'] as $v): ?>
                                <li class="nav-item ">
                                    <?php if(!empty($v['__child']) && is_array($v['__child'])): ?>
                                        <a href="javascript:;" class="nav-link nav-toggle">
                                            <i class="<?= $v['icon'] ?>"></i>
                                            <span class="title"><?= $v['name'] ?></span>

                                            <span class="arrow"></span>
                                        </a>
                                    <?php else: ?>
                                        <a href="<?= \yii\helpers\Url::toRoute($v['url']) ?>" nav="<?= $v['url'] ?>" class="nav-link ">
                                            <span class="title"><?= $v['title'] ?></span>

                                            <!--<span class="arrow"></span>-->
                                        </a>
                                    <?php endif;?>


                                    <ul class="sub-menu">
                                        <?php if(!empty($v['__child']) && is_array($v['__child'])): ?>
                                            <?php foreach ($v['__child'] as $v2): ?>

                                                <li class="nav-item">
                                                    <a href="<?= \yii\helpers\Url::toRoute($v2['url']) ?>" nav="<?= $v2['url'] ?>" class="nav-link ">
                                                        <span class="title"><?= $v2['title'] ?></span>
                                                    </a>
                                                </li>

                                            <?php endforeach; ?>
                                        <?php endif;?>
                                    </ul>
                                </li>
                            <?php endforeach; ?>
                        <?php endif;?>
                    </ul>
                </li>
            <?php endforeach; ?>
        <?php endif; ?>

    </ul>
    <!-- END SIDEBAR MENU -->
</div>