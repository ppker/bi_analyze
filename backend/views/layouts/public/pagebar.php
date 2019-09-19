<div class="page-bar">
    <ul class="page-breadcrumb">
        <?php if (!empty($breadcrumbs) && is_array($breadcrumbs)): ?>
            <?php foreach($breadcrumbs as $breadcrumb): ?>
                <li>
                    <a href="javascript:;"><?= $breadcrumb['title'] ?></a>
                    <i class="fa fa-circle"></i>
                </li>
            <?php endforeach;?>
            <li><a href="javascript:;">内容</a></li>
        <?php endif; ?>
    </ul>
    <div class="page-toolbar">
        <div id="dashboard-report-range" class="pull-right tooltips btn btn-sm" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range">
            <i class="icon-calendar"></i>&nbsp;
            <span class="thin uppercase hidden-xs"></span>&nbsp;
            <i class="fa fa-angle-down"></i>
        </div>
    </div>
</div>